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
    const abortController = new AbortController()
    fetchAndParseCollection(id, abortController)
      .then((result) => {
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
  }, [id, location, collectionNeedsReloaded, setCollection])

  // Directories fetch - these are only the ones added to the collection, NOT the full list
  useEffect(() => {
    const abortController = new AbortController()
    const query = ` {
      listFileGroupsForS3(limit: 10000) {
        items {
          objectFileGroupId
          files {
            items {
              objectFileGroupId
              id
              label
              source
              sourceType
              path
              iiifImageUri
            }
          }
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
        setDirectories(getDirectories(data.data.listFileGroupsForS3.items))
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

  const updateItemFunction = ({ itemId, generalDefaultFilePath, generalObjectFileGroupId, generalPartiallyDigitized }) => {
    const abortController = new AbortController()
    let query = ''
    if (typeof generalPartiallyDigitized !== 'undefined') {
      query = `mutation {
          replacePartiallyDigitized(input: {
            id: "${itemId}",
            generalPartiallyDigitized: ${generalPartiallyDigitized},
          }) {
            id
          }
        }
        `
    } else {
      query = `mutation {
          replaceDefaultImage(input: {
            id: "${itemId}",
            generalDefaultFilePath: "${generalDefaultFilePath}",
            generalObjectFileGroupId: "${generalObjectFileGroupId}",
          }) {
            id
          }
        }
        `
    }
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
      .then((result) => {
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
    const split = d.objectFileGroupId.split('-')
    let baseDirectoryGroup = 'none'
    if (split.length > 1) {
      baseDirectoryGroup = split[0]
    }

    if (!directories[baseDirectoryGroup]) {
      directories[baseDirectoryGroup] = {}
    }
    directories[baseDirectoryGroup][d.objectFileGroupId] = {
      id: d.objectFileGroupId,
      files: d.files.items,
    }
    // d.sortId = d.id.replace(d.objectFileGroupId, '')
    // directories[baseDirectoryGroup][d.objectFileGroupId].files.push(d)
  })
  return directories
}

Collection.propTypes = {
  id: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired,
}
export default Collection
