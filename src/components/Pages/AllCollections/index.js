import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Loading from 'components/Layout/Loading'
import ErrorMessage from 'components/Layout/ErrorMessage'
import Content from './Content'
import { useAPIContext } from 'context/APIContext'
import { useAuthContext } from 'context/AuthContext'

export const fetchStatus = {
  NOT_FETCHED: 'NOT_FETCHED',
  FETCHING: 'FETCHING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
}

const AllCollections = ({ location }) => {
  const [archiveSpaceContent, setArchiveSpaceContent] = useState([])
  const [alephContent, setAlephContent] = useState([])
  const [archiveSpaceStatus, setArchiveSpaceStatus] = useState(fetchStatus.FETCHING)
  const [alephStatus, setAlephStatus] = useState(fetchStatus.FETCHING)
  const [importCollectionStatus, setImportCollectionStatus] = useState(fetchStatus.NOT_FETCHED)
  const [errorMsg, setErrorMsg] = useState()

  const { token } = useAuthContext()
  const { graphqlApiUrl } = useAPIContext()
  useEffect(() => {
    if (!token) {
      return
    }

    const abortController = new AbortController()
    const query = `query {
        listItemsBySourceSystem(id: "ARCHIVESSPACE", limit: 1000) {
          items {
            id
            title
            linkToSource
            partiallyDigitized
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
  }, [location, graphqlApiUrl, token])

  useEffect(() => {
    if (!token) {
      return
    }

    const abortController = new AbortController()

    const fetchPage = async (allItemsArr = [], nextToken) => {
      const query = `query {
          listItemsBySourceSystem(id: "ALEPH", limit: 1000${nextToken ? `, nextToken: "${nextToken}"` : ''}) {
            items {
              id
              title
              linkToSource
              partiallyDigitized
            }
            nextToken
          }
        }
      `
      return fetch(
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
        .then(async (result) => {
          allItemsArr = allItemsArr.concat(result.data.listItemsBySourceSystem.items)
          // If there's a nextToken, we have more results to fetch and append to the array
          const nextToken = result.data.listItemsBySourceSystem.nextToken
          if (nextToken) {
            allItemsArr = await fetchPage(allItemsArr, nextToken)
          } else {
            setAlephContent(allItemsArr)
            setAlephStatus(fetchStatus.SUCCESS)
          }
          return allItemsArr
        })
        .catch((result) => {
          setErrorMsg(result.error)
          setAlephStatus(fetchStatus.ERROR)
        })
    }
    fetchPage()

    return () => {
      abortController.abort()
    }
  }, [location, graphqlApiUrl, token])

  const importCollectionFunction = ({ itemUrl, sourceSystem }) => {
    const abortController = new AbortController()
    const query = `mutation {
      addItemToHarvest(
        harvestItemId: "${itemUrl}",
        sourceSystem: "${sourceSystem}",
      ) {
        PK
        SK
      }
    }
    `
    setImportCollectionStatus(fetchStatus.FETCHING)
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
      .then((result) => {
        setImportCollectionStatus((result.errors && result.errors.length) ? fetchStatus.ERROR : fetchStatus.SUCCESS)
      })
      .catch((error) => {
        setErrorMsg(error)
        setImportCollectionStatus(fetchStatus.ERROR)
      })

    return () => {
      abortController.abort()
    }
  }

  const allStatuses = [archiveSpaceStatus, alephStatus]
  if (allStatuses.some(status => status === fetchStatus.ERROR)) {
    return <ErrorMessage error={errorMsg} />
  } else if (allStatuses.every(status => status === fetchStatus.SUCCESS)) {
    return (
      <Content
        collections={archiveSpaceContent.concat(alephContent)}
        importCollectionFunction={importCollectionFunction}
        importCollectionStatus={importCollectionStatus}
      />
    )
  } else {
    return <Loading />
  }
}

AllCollections.propTypes = {
  location: PropTypes.object.isRequired,
}
export default AllCollections
