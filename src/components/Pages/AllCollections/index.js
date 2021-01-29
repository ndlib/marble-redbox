import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Loading from 'components/Layout/Loading'
import ErrorMessage from 'components/Layout/ErrorMessage'
import Content from './Content'
import { useAPIContext } from 'context/APIContext'

export const fetchStatus = {
  FETCHING: 'FETCHING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
}

const AllCollections = ({ location }) => {
  const [archiveSpaceContent, setArchiveSpaceContent] = useState([])
  const [alephContent, setAlephContent] = useState([])
  const [archiveSpaceStatus, setArchiveSpaceStatus] = useState(fetchStatus.FETCHING)
  const [alephStatus, setAlephStatus] = useState(fetchStatus.FETCHING)
  const [errorMsg, setErrorMsg] = useState()

  const { graphqlApiKey, graphqlApiUrl } = useAPIContext()
  useEffect(() => {
    const abortController = new AbortController()
    const query = `query {
        listItemsBySourceSystem(id: "ARCHIVESSPACE", limit: 1000) {
          items {
            id
            title
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
        method: 'POST',
        signal: abortController.signal,
        mode: 'cors',
        body: JSON.stringify({ query: query }),
      })
      .then(result => {
        return result.json()
      })
      .then((result) => {
        setArchiveSpaceContent(result.data.listItemsBySourceSystem.items)
        setArchiveSpaceStatus(fetchStatus.SUCCESS)
      })
      .catch((result) => {
        setErrorMsg(result.error)
        setArchiveSpaceStatus(fetchStatus.ERROR)
      })
    return () => {
      abortController.abort()
    }
  }, [location, graphqlApiUrl, graphqlApiKey])

  useEffect(() => {
    const abortController = new AbortController()
    const query = `query {
        listItemsBySourceSystem(id: "ALEPH", limit: 1000) {
          items {
            id
            title
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
        method: 'POST',
        signal: abortController.signal,
        mode: 'cors',
        body: JSON.stringify({ query: query }),
      })
      .then(result => {
        return result.json()
      })
      .then((result) => {
        setAlephContent(result.data.listItemsBySourceSystem.items)
        setAlephStatus(fetchStatus.SUCCESS)
      })
      .catch((result) => {
        setErrorMsg(result.error)
        setAlephStatus(fetchStatus.ERROR)
      })
    return () => {
      abortController.abort()
    }
  }, [location, graphqlApiUrl, graphqlApiKey])

  const allStatuses = [archiveSpaceStatus, alephStatus]
  if (allStatuses.some(status => status === fetchStatus.ERROR)) {
    return <ErrorMessage error={errorMsg} />
  } else if (allStatuses.every(status => status === fetchStatus.SUCCESS)) {
    return <Content collections={archiveSpaceContent.concat(alephContent)} />
  } else {
    return <Loading />
  }
}

AllCollections.propTypes = {
  location: PropTypes.object.isRequired,
}
export default AllCollections
