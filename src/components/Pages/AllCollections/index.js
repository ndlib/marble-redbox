import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Loading from 'components/Layout/Loading'
import ErrorMessage from 'components/Layout/ErrorMessage'
import Content from './Content'
import { useAPIContext } from 'context/APIContext'

const AllCollections = ({ location }) => {
  const [content, setContent] = useState(<Loading />)
  const { graphqlApiKey, graphqlApiUrl } = useAPIContext()
  useEffect(() => {
    const abortController = new AbortController()
    const query = `query {
        listMergedMetadata(filter: {parentId: {eq: "root"}, sourceSystem: {ne: "EmbARK"}}, limit: 1000) {
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
        setContent(<Content collections={result.data.listMergedMetadata.items} />)
      })
      .catch((result) => {
        setContent(<ErrorMessage error={result.error} />)
      })
    return () => {
      abortController.abort()
    }
  }, [location, graphqlApiUrl, graphqlApiKey])
  return (
    <div>{content}</div>
  )
}

AllCollections.propTypes = {
  location: PropTypes.object.isRequired,
}
export default AllCollections
