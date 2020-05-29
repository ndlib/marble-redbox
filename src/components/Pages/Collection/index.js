import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useAPIContext } from 'context/APIContext'
const Collection = ({ id, location }) => {
  const [content, setContent] = useState(null)
  const { collectionsURL } = useAPIContext()
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
        setContent(<code>{JSON.stringify(data)}</code>)
      })
      .catch((error) => {
        console.error(error)
      })
    return () => {
      abortController.abort()
    }
  }, [id, location, collectionsURL])
  return (
    <>
      <div>Collection {id}</div>
      {content}
    </>
  )
}
Collection.propTypes = {
  id: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired,
}
export default Collection
