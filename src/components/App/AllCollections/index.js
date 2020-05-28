import React, { useState, useEffect } from 'react'

const Collection = ({ location }) => {
  const [content, setContent] = useState('collections')
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
        setContent(<code>{JSON.stringify(data)}</code>)
      })
      .catch((error) => {
        console.error(error)
      })
    return () => {
      abortController.abort()
    }
  }, [location])
  return (
    <div>{content}</div>
  )
}

export default Collection
