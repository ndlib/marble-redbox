import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useAPIContext } from 'context/APIContext'
import { useCollectionContext } from 'context/CollectionContext'
import { useDirectoriesContext } from 'context/DirectoriesContext'
import ErrorMessage from 'components/Layout/ErrorMessage'
import Loading from 'components/Layout/Loading'
import Content from './Content'

export const fetchStatus = {
  FETCHING: 'FETCHING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
}

const Collection = ({ id, location }) => {
  const [collectionStatus, setCollectionStatus] = useState(fetchStatus.FETCHING)
  const [directoriesStatus, setDirectoriesStatus] = useState(fetchStatus.FETCHING)
  const [errorMsg, setErrorMsg] = useState()
  const { collectionsURL } = useAPIContext()
  const { setCollection } = useCollectionContext()
  const { setDirectories } = useDirectoriesContext()

  // Collection fetch
  useEffect(() => {
    const abortController = new AbortController()
    const query = `query {
      getMarbleItems(id: "${id}") {
        id
        title
        level
        objectFileGroupId
        collectionId
        defaultImageId
        redbox {
          generalDefaultImageId
        	generalObjectFileGroupId
        	generalPartiallyDigitized
        }
        items (limit: 1000){
          items {
            id
            title
            level
            objectFileGroupId
            collectionId
            defaultImageId
            redbox {
              generalDefaultImageId
            	generalObjectFileGroupId
            	generalPartiallyDigitized
            }
            files {
              items {
                id
                label
                fileId
              }
            }
          }
        }
        files {
          items {
            id
            label
            fileId
          }
        }
      }
    }
    `
    fetch(
      "https://u6j4kl5davbdvhhnf4miuugf2a.appsync-api.us-east-1.amazonaws.com/graphql",
      {
        headers: {
          'x-api-key': 'da2-wh6ulmemfraztlcibgz6zzlckm',
          'Content-Type': 'application/json',
        },
        method: 'POST',
        signal: abortController.signal,
        mode: 'cors',
        body: JSON.stringify({ query: query })

      })
      .then(result => {
        return result.json()
      })
      .then((data) => {
        console.log(data)
        const result = data.data.getMarbleItems
        updateOverwrittenItemData(result)
        console.log(result)
        setCollection(result)
        setCollectionStatus(fetchStatus.SUCCESS)
      })
      .catch((error) => {
        console.log(error)
        setErrorMsg(error)
        setCollectionStatus(fetchStatus.ERROR)
      })
    return () => {
      abortController.abort()
    }
  }, [id, location, collectionsURL, setCollection])

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
      "https://u6j4kl5davbdvhhnf4miuugf2a.appsync-api.us-east-1.amazonaws.com/graphql",
      {
        headers: {
          'x-api-key': 'da2-wh6ulmemfraztlcibgz6zzlckm',
          'Content-Type': 'application/json',
        },
        method: 'POST', // Just a default. Can be overridden
        signal: abortController.signal,
        mode: 'cors',
        body: JSON.stringify({ query: query })
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
  }, [id, collectionsURL, setDirectories])

  const allStatuses = [collectionStatus, directoriesStatus]
  if (allStatuses.some(status => status === fetchStatus.ERROR)) {
    return <ErrorMessage error={errorMsg} />
  } else if (allStatuses.every(status => status === fetchStatus.SUCCESS)) {
    return <Content />
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
        files: []
      }
    }
    directories[d.fileId].files.push(d)
  })
  return directories
}


const updateOverwrittenItemData = (data) => {
  console.log(data.title)
  if (data.redbox) {
    console.log("hi")
    if (data.redbox.generalDefaultImageId) {
      data.defaultImageId = data.redbox.generalDefaultImageId
    }
    if (data.redbox.generalObjectFileGroupId) {
      data.objectFileGroupId = data.redbox.generalObjectFileGroupId
    }
    if (data.redbox.generalPartiallyDigitized) {
      data.partiallyDigitized = data.redbox.generalPartiallyDigitized
    }
  }

  if (data.items && data.items.items) {
    data.items.items.forEach(item => updateOverwrittenItemData(item))
  }
  

  return data
}

Collection.propTypes = {
  id: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired,
}
export default Collection
