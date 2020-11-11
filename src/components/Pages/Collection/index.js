import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  useCollectionContext,
  fetchAndParseCollection,
} from 'context/CollectionContext'
import { useDirectoriesContext } from 'context/DirectoriesContext'
import ErrorMessage from 'components/Layout/ErrorMessage'
import Loading from 'components/Layout/Loading'
import Content from './Content'
import { useAPIContext } from 'context/APIContext'

export const fetchStatus = {
  FETCHING: 'FETCHING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
}

const Collection = ({ id, location }) => {
  const [collectionStatus, setCollectionStatus] = useState(fetchStatus.FETCHING)
  const [collectionNeedsReloaded, setCollectionNeedsReloaded] = useState(1)
  const [directoriesStatus, setDirectoriesStatus] = useState(fetchStatus.FETCHING)
  const [errorMsg, setErrorMsg] = useState()
  const { setCollection } = useCollectionContext()
  const { setDirectories } = useDirectoriesContext()
  const { graphqlApiKey, graphqlApiUrl } = useAPIContext()

  // Collection fetch
  useEffect(() => {
    console.log('reload')
    const abortController = new AbortController()
    fetchAndParseCollection(id, abortController)
      .then((result) => {
        console.log(result)
        setCollection(result)
        setCollectionStatus(fetchStatus.SUCCESS)
      })
      .catch((error) => {
        setErrorMsg(error)
        setCollectionStatus(fetchStatus.ERROR)
      })
    return () => {
      abortController.abort()
    }
  }, [id, location, setCollection, collectionNeedsReloaded])

  // Directories fetch - these are only the ones added to the collection, NOT the full list
  useEffect(() => {
    const abortController = new AbortController()
    const query = ` {
      listFiles(limit: 10000) {
        items {
          objectFileGroupId
          id
          label
          iiifImageUri
        }
      }
    }
    `
    fetch(
      graphqlApiUrl,
      {
        headers: {
          'x-api-key': graphqlApiKey,
          'Content-Type': 'application/json',
        },
        method: 'POST', // Just a default. Can be overridden
        signal: abortController.signal,
        mode: 'cors',
        body: JSON.stringify({ query: query }),
      })
      .then(result => {
        return result.json()
      })
      .then((data) => {
        setDirectories(getDirectories(data.data.listFiles.items))
        setDirectoriesStatus(fetchStatus.SUCCESS)
      })
      .catch((error) => {
        setErrorMsg(error)
        setDirectoriesStatus(fetchStatus.ERROR)
      })
    return () => {
      abortController.abort()
    }
  }, [graphqlApiKey, graphqlApiUrl, setDirectories])

  const updateItemFunction = ({ itemId, generalDefaultImageId, generalObjectFileGroupId, generalPartiallyDigitized }) => {
    const abortController = new AbortController()

    const query = `mutation {
        updateMetadataAugmentation(input: {
          collectionId: "${id}",
          id: "${itemId}"
          ${(typeof generalDefaultImageId !== 'undefined') ? `generalDefaultFilePath: "${generalDefaultImageId}",` : ''}
          ${(typeof generalObjectFileGroupId !== 'undefined') ? `generalObjectFileGroupId: "${generalObjectFileGroupId}",` : ''}
          ${(typeof generalPartiallyDigitized !== 'undefined') ? `generalPartiallyDigitized: ${generalPartiallyDigitized},` : ''}
        }) {
          id
        }
      }
      `
    console.log(query)
    // setCollectionStatus(fetchStatus.FETCHING)

    fetch(
      graphqlApiUrl,
      {
        headers: {
          'x-api-key': graphqlApiKey,
          'Content-Type': 'application/json',
        },
        method: 'POST',
        signal: abortController.signal,
        mode: 'cors',
        body: JSON.stringify({ query: query }),

      })
      .then(result => {
        return result.json()
      })
      .then(() => {
        setCollectionNeedsReloaded(collectionNeedsReloaded + 1)
      })
      .catch((error) => {
        setErrorMsg(error)
        setCollectionStatus(fetchStatus.ERROR)
      })

    return () => {
      abortController.abort()
    }
  }

  const allStatuses = [collectionStatus, directoriesStatus]
  if (allStatuses.some(status => status === fetchStatus.ERROR)) {
    return <ErrorMessage error={errorMsg} />
  } else if (allStatuses.every(status => status === fetchStatus.SUCCESS)) {
    return <Content updateItemFunction={updateItemFunction} />
  } else {
    return <Loading />
  }
}

const getDirectories = (data) => {
  const directories = {}
  data.forEach(d => {
    if (!directories[d.objectFileGroupId]) {
      directories[d.objectFileGroupId] = {
        id: d.objectFileGroupId,
        files: [],
      }
    }
    directories[d.objectFileGroupId].files.push(d)
  })
  return directories
}

Collection.propTypes = {
  id: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired,
}
export default Collection
