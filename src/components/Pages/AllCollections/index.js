import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Loading from 'components/Layout/Loading'
import ErrorMessage from 'components/Layout/ErrorMessage'
import Content from './Content'

const AllCollections = ({ location }) => {
  const [content, setContent] = useState(<Loading />)
  useEffect(() => {
    const abortController = new AbortController()
    fetch(
      'https://presentation-iiif.library.nd.edu/experimental/collections/',
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
  }, [location])
  return (
    <div>{content}</div>
  )
}

AllCollections.propTypes = {
  location: PropTypes.object.isRequired,
}
export default AllCollections
