import React, { useState, useEffect } from 'react'

const Collection = ({ id, location }) => {
  const [content, setContent] = useState('collections')
  useEffect(() => {
    const abortController = new AbortController()
    fetch(
      `https://presentation-iiif.library.nd.edu/experimental/collections/${id}/`,
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
  }, [id, location])
  return (
    <>
      <div>Collection {id}</div>
      <div>{content}</div>
    </>
  )
}

export default Collection
