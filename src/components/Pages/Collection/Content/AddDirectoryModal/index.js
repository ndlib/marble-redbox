import React, { useState, useEffect } from 'react'
import { useAPIContext } from 'context/APIContext'
import ErrorMessage from 'components/Layout/ErrorMessage'
import Loading from 'components/Layout/Loading'
import Content from './Content'

export const fetchStatus = {
  FETCHING: 'FETCHING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
}

const AddDirectoryModal = (props) => {
  const { directoriesURL } = useAPIContext()
  const [allDirectories, setAllDirectories] = useState()
  const [status, setStatus] = useState(fetchStatus.FETCHING)
  const [errorMsg, setErrorMsg] = useState()

  useEffect(() => {
    const abortController = new AbortController()
    fetch(
      directoriesURL,
      {
        method: 'GET',
        signal: abortController.signal,
        mode: 'cors',
      })
      .then(result => {
        return result.json()
      })
      .then((data) => {
        setAllDirectories(data)
        setStatus(fetchStatus.SUCCESS)
      })
      .catch((error) => {
        setErrorMsg(error)
        setStatus(fetchStatus.ERROR)
      })
    return () => {
      abortController.abort()
    }
  }, [directoriesURL])

  if (status === fetchStatus.ERROR) {
    return <ErrorMessage error={errorMsg} />
  } else if (status === fetchStatus.SUCCESS) {
    return <Content {...props} directories={allDirectories} />
  } else {
    return <Loading />
  }
}

export default AddDirectoryModal
