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
    fetch(
      collectionsURL,
      {
        method: 'GET',
        signal: abortController.signal,
        mode: 'cors',
      })
      .then(result => {
        return result.json()
      })
      .then((data) => {
        setContent(<Content collections={data} />)
      })
      .catch((error) => {
        setContent(<ErrorMessage error={error} />)
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
