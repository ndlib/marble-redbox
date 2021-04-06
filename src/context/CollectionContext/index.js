import { createContext, useContext } from 'react'

export const initialContext = {
  collection: { },
  setCollection: () => {},
}
export const CollectionContext = createContext(initialContext)
export const useCollectionContext = () => useContext(CollectionContext)
export default CollectionContext

const collectionGrapgqlQuery = (id) => {
  return `query {
    getItem(id: "${id}") {
      id
      title
      level
      objectFileGroupId
      collectionId
      defaultFile {
        mediaServer
        mediaResourceId
      }
      copyrightStatement
      copyrightStatus
      copyrightUrl
      partiallyDigitized
      children {
        items {
          id
          title
          level
          objectFileGroupId
          collectionId
          defaultFile {
            mediaServer
            mediaResourceId
          }
          copyrightStatement
          copyrightStatus
          copyrightUrl
          partiallyDigitized
        }
      }
    }
  }
  `
}

export const fetchAndParseCollection = (id, abortController) => {
  const query = collectionGrapgqlQuery(id)
  return fetch(
    process.env.GRAPHQL_API_URL,
    {
      headers: {
        'x-api-key': process.env.GRAPHQL_API_KEY,
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
    .then((data) => {
      const result = data.data.getItem
      return result
    })
}
