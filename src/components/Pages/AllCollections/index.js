import React, { useState, useEffect } from 'react'
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
        console.log(data)
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

export default AllCollections
