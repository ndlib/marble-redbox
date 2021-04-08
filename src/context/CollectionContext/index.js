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
      files {
        items {
          id
          mediaServer
          mediaResourceId
        }
      }
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
          files {
            items {
              id
              mediaServer
              mediaResourceId
            }
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

export const fetchAndParseCollection = (id, graphqlApiUrl, graphqlApiKey, abortController) => {
  const query = collectionGrapgqlQuery(id)
  return fetch(
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
    .then((data) => {
      console.log('getitem', data)
      const result = data.data.getItem
      return result
    })
}
