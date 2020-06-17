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
  const { collectionsURL, directoriesURL } = useAPIContext()
  const { setCollection } = useCollectionContext()
  const { setDirectories } = useDirectoriesContext()

  // Collection fetch
  useEffect(() => {
    const abortController = new AbortController()
    fetch(
      `${collectionsURL}${id}/`,
      {
        method: 'GET',
        signal: abortController.signal,
        mode: 'cors',
      })
      .then(result => {
        return result.json()
      })
      .then((data) => {
        setCollection(data)
        setCollectionStatus(fetchStatus.SUCCESS)
      })
      .catch((error) => {
        setErrorMsg(error)
        setCollectionStatus(fetchStatus.ERROR)
      })
    return () => {
      abortController.abort()
    }
  }, [id, location, collectionsURL, setCollection])

  // Directories fetch
  useEffect(() => {
    const abortController = new AbortController()
    fetch(
      directoriesURL,
      {
        method: 'GET', // Just a default. Can be overridden
        signal: abortController.signal,
        mode: 'cors',
      })
      .then(result => {
        return result.json()
      })
      .then((data) => {
        setDirectories(data)
        setDirectoriesStatus(fetchStatus.SUCCESS)
      })
      .catch((error) => {
        setErrorMsg(error)
        setDirectoriesStatus(fetchStatus.ERROR)
      })
    return () => {
      abortController.abort()
    }
  }, [directoriesURL, setDirectories])

  const allStatuses = [collectionStatus, directoriesStatus]
  if (allStatuses.some(status => status === fetchStatus.ERROR)) {
    return <ErrorMessage error={errorMsg} />
  } else if (allStatuses.every(status => status === fetchStatus.SUCCESS)) {
    return <Content />
  } else {
    return <Loading />
  }
}
Collection.propTypes = {
  id: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired,
}
export default Collection
