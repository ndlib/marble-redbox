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
import { useAuthContext } from 'context/AuthContext'

export const fetchStatus = {
  FETCHING: 'FETCHING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
}

const Collection = ({ id, location }) => {
  const [collectionStatus, setCollectionStatus] = useState(fetchStatus.FETCHING)
  const [collectionNeedsReloaded, setCollectionNeedsReloaded] = useState(1)
  const [imageDirectoriesStatus, setImageDirectoriesStatus] = useState(fetchStatus.FETCHING)
  const [mediaDirectoriesStatus, setMediaDirectoriesStatus] = useState(fetchStatus.FETCHING)
  const [errorMsg, setErrorMsg] = useState()
  const { setCollection } = useCollectionContext()
  const {
    setImageDirectories,
    setImageDirectoriesReferenced,
    setMediaDirectories,
    setMediaDirectoriesReferenced,
  } = useDirectoriesContext()
  const { graphqlApiUrl } = useAPIContext()
  const { token } = useAuthContext()

  // Collection fetch
  useEffect(() => {
    if (!token) {
      return
    }

    const abortController = new AbortController()
    fetchAndParseCollection(id, graphqlApiUrl, token, abortController)
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
  }, [id, location, collectionNeedsReloaded, setCollection, graphqlApiUrl, token])

  // Fetch image groups
  useEffect(() => {
    if (!token) {
      return
    }

    const abortController = new AbortController()

    const fetchImageGroups = async (imageGroups = {}, nextToken) => {
      const query = ` {
        listImageGroupsForS3(limit: 10000${nextToken ? `, nextToken: "${nextToken}"` : ''}) {
          items {
            imageGroupId
            images {
              items {
                imageGroupId
                id
                filePath
                mediaServer
                mediaResourceId
              }
            }
          }
          nextToken
        }
      }
      `
      fetch(
        graphqlApiUrl,
        {
          headers: {
            Authorization: token,
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
        .then(async (result) => {
          Object.assign(imageGroups, mapImageDirectories(result.data.listImageGroupsForS3.items))
          // If there's a nextToken, we have more results to fetch and append to the array
          const nextToken = result.data.listImageGroupsForS3.nextToken
          if (nextToken) {
            imageGroups = await fetchImageGroups(imageGroups, nextToken)
          } else {
            setImageDirectories(imageGroups)
            setImageDirectoriesStatus(fetchStatus.SUCCESS)
          }
          return imageGroups
        })
        .catch((error) => {
          setErrorMsg(error)
          setImageDirectoriesStatus(fetchStatus.ERROR)
        })
    }
    fetchImageGroups()

    return () => {
      abortController.abort()
    }
  }, [token, graphqlApiUrl, setImageDirectories])

  // Fetch media groups
  useEffect(() => {
    if (!token) {
      return
    }

    const abortController = new AbortController()
    const query = ` {
      listMediaGroupsForS3(limit: 10000) {
        items {
          mediaGroupId
          media {
            items {
              mediaGroupId
              id
              filePath
              mediaServer
              mediaResourceId
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
          Authorization: token,
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
        setMediaDirectories(mapMediaDirectories(data.data.listMediaGroupsForS3.items))
        setMediaDirectoriesStatus(fetchStatus.SUCCESS)
      })
      .catch((error) => {
        setErrorMsg(error)
        setMediaDirectoriesStatus(fetchStatus.ERROR)
      })
    return () => {
      abortController.abort()
    }
  }, [token, graphqlApiUrl, setMediaDirectories])

  // Fetch list of image groups that are already used
  useEffect(() => {
    if (!token) {
      return
    }

    const abortController = new AbortController()

    const fetchReferencedImageGroups = async (imageGroupIds = [], nextToken) => {
      const query = ` {
        listImageGroupsReferenced(limit: 10000${nextToken ? `, nextToken: "${nextToken}"` : ''}) {
          items {
            imageGroupId
          }
          nextToken
        }
      }
      `
      fetch(
        graphqlApiUrl,
        {
          headers: {
            Authorization: token,
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
        .then(async (result) => {
          imageGroupIds = imageGroupIds.concat(result.data.listImageGroupsReferenced.items.map(item => item.imageGroupId))
          // If there's a nextToken, we have more results to fetch and append to the array
          const nextToken = result.data.listImageGroupsReferenced.nextToken
          if (nextToken) {
            imageGroupIds = await fetchReferencedImageGroups(imageGroupIds, nextToken)
          } else {
            setImageDirectoriesReferenced(imageGroupIds)
          }
          return imageGroupIds
        })
        .catch((error) => {
          setErrorMsg(error)
        })
    }
    fetchReferencedImageGroups()

    return () => {
      abortController.abort()
    }
  }, [token, graphqlApiUrl, setImageDirectoriesReferenced])

  const updateItemFunction = ({ itemId, generalDefaultFilePath, generalImageGroupId, generalPartiallyDigitized }) => {
    const abortController = new AbortController()
    let query = ''
    if (typeof generalPartiallyDigitized !== 'undefined') {
      query = `mutation {
          savePartiallyDigitizedForWebsite(
            itemId: "${itemId}",
            partiallyDigitized: ${generalPartiallyDigitized},
          ) {
            id
          }
        }
        `
    } else {
      query = `mutation {
          saveDefaultImageForWebsite(
            itemId: "${itemId}",
            defaultFilePath: "${generalDefaultFilePath}",
            imageGroupId: "${generalImageGroupId}",
          ) {
            id
          }
        }
        `
    }
    fetch(
      graphqlApiUrl,
      {
        headers: {
          Authorization: token,
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

  const allStatuses = [collectionStatus, imageDirectoriesStatus, mediaDirectoriesStatus]
  if (allStatuses.some(status => status === fetchStatus.ERROR) || errorMsg) {
    return <ErrorMessage error={errorMsg} />
  } else if (allStatuses.every(status => status === fetchStatus.SUCCESS)) {
    return <Content updateItemFunction={updateItemFunction} />
  } else {
    return <Loading />
  }
}

const mapImageDirectories = (data) => {
  const directories = {}
  data.forEach(d => {
    const split = d.imageGroupId.split('-')
    let baseDirectoryGroup = 'none'
    if (split.length > 1) {
      baseDirectoryGroup = split[0]
    }

    if (!directories[baseDirectoryGroup]) {
      directories[baseDirectoryGroup] = {}
    }
    directories[baseDirectoryGroup][d.imageGroupId] = {
      id: d.imageGroupId,
      images: d.images.items,
    }
    // d.sortId = d.id.replace(d.imageGroupId, '')
    // directories[baseDirectoryGroup][d.imageGroupId].images.push(d)
  })
  return directories
}

const mapMediaDirectories = (data) => {
  const directories = {}
  data.forEach(d => {
    directories[d.mediaGroupId] = {
      id: d.mediaGroupId,
      media: d.media.items,
    }
  })
  return directories
}

Collection.propTypes = {
  id: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired,
}
export default Collection
