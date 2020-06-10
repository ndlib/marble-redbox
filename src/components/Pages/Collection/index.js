import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useAPIContext } from 'context/APIContext'
import ErrorMessage from 'components/Layout/ErrorMessage'
import Loading from 'components/Layout/Loading'
import Content from './Content'
const Collection = ({ id, location }) => {
  const [content, setContent] = useState(<Loading />)
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
        setContent(<Content collection={data} />)
      })
      .catch((error) => {
        setContent(<ErrorMessage error={error} />)
      })
    return () => {
      abortController.abort()
    }
  }, [id, location, collectionsURL])
  return (
    <>{content}</>
  )
}
Collection.propTypes = {
  id: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired,
}
export default Collection
