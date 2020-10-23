import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useAPIContext } from 'context/APIContext'
import {
  useCollectionContext,
  fetchAndParseCollection,
} from 'context/CollectionContext'
import { useDirectoriesContext } from 'context/DirectoriesContext'
import ErrorMessage from 'components/Layout/ErrorMessage'
import Loading from 'components/Layout/Loading'
import Content from './Content'

export const fetchStatus = {
  RELOAD: 'RELOAD',
  FETCHING: 'FETCHING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
}

const Collection = ({ id, location }) => {
  const [collectionStatus, setCollectionStatus] = useState(fetchStatus.RELOAD)
  const [directoriesStatus, setDirectoriesStatus] = useState(fetchStatus.FETCHING)
  const [errorMsg, setErrorMsg] = useState()
  const { collection, setCollection } = useCollectionContext()
  const { setDirectories } = useDirectoriesContext()

  // Collection fetch
  useEffect(() => {
    if (collectionStatus !== fetchStatus.RELOAD) {
      return
    }
    setCollectionStatus(fetchStatus.FETCHING)

    const abortController = new AbortController()
    fetchAndParseCollection(id, abortController)
      .then((result) => {
        console.log(1)
        setCollection(result)
        console.log(2)
        setCollectionStatus(fetchStatus.SUCCESS)
        console.log(3)
      })
      .catch((error) => {
        console.log('BIG ERROR', error)
        setErrorMsg(error)
        setCollectionStatus(fetchStatus.ERROR)
      })
    return () => {
      abortController.abort()
    }
  }, [id, location, collectionStatus, setCollection])

  // Directories fetch - these are only the ones added to the collection, NOT the full list
  useEffect(() => {
    const abortController = new AbortController()
    const query = ` {
      listFiles(limit: 10000) {
        items {
          fileId
          id
          label
          iiifImageUri
        }
      }
    }
    `
    fetch(
      process.env.GRAPHQL_API_URL,
      {
        headers: {
          'x-api-key': process.env.GRAPHQL_API_KEY,
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
  }, [setDirectories])

  const updateItemFunction = (itemId, generalDefaultImageId, generalObjectFileGroupId) => {
    const abortController = new AbortController()

    const query = `mutation {
        updateGeneralSettings(input: {
          collectionId: "${id}",
          generalDefaultImageId: "${generalDefaultImageId}",
          generalObjectFileGroupId: "${generalObjectFileGroupId}",
          id: "${itemId}"
        }) {
          id
        }
      }
      `
    setCollectionStatus(fetchStatus.FETCHING)

    fetch(
      process.env.GRAPHQL_API_URL,
      {
        headers: {
          'x-api-key': process.env.GRAPHQL_API_KEY,
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
      .then((data) => {
        setCollectionStatus(fetchStatus.RELOAD)
      })
      .catch((error) => {
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
    if (!directories[d.fileId]) {
      directories[d.fileId] = {
        id: d.fileId,
        files: [],
      }
    }
    directories[d.fileId].files.push(d)
  })
  return directories
}

Collection.propTypes = {
  id: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired,
}
export default Collection
