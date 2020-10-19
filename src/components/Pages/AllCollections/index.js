import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Loading from 'components/Layout/Loading'
import ErrorMessage from 'components/Layout/ErrorMessage'
import Content from './Content'
import { useAPIContext } from 'context/APIContext'

const AllCollections = ({ location }) => {
  const [content, setContent] = useState(<Loading />)
  const { collectionsURL } = useAPIContext()
  useEffect(() => {
    const abortController = new AbortController()
    const query = `query {
        listMarbleItems(filter: {parentId: {eq: "root"}, sourceSystem: {eq: "ArchivesSpace"}}, limit: 1000) {
          items {
            id
            title
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
      .then((result) => {
        console.log("notError", result.data.listMarbleItems.items, result.data.listMarbleItems.items.map)
        setContent(<Content collections={result.data.listMarbleItems.items} />)
      })
      .catch((result) => {
        console.log("error", result)
        setContent(<ErrorMessage error={result.error} />)
      })
    return () => {
      abortController.abort()
    }
  }, [location, collectionsURL])
  return (
    <div>{content}</div>
  )
}

AllCollections.propTypes = {
  location: PropTypes.object.isRequired,
}
export default AllCollections
