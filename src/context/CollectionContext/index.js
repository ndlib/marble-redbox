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
    getItem(id: "${id}", websiteId: "all") {
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
      const result = data.data.getItem
      return result
    })
}

export const updateItemFunctionBase = ({ itemId, generalDefaultFilePath, generalObjectFileGroupId, generalPartiallyDigitized, graphqlApiKey, graphqlApiUrl, abortController }) => {
  console.log(itemId, generalDefaultFilePath, generalObjectFileGroupId, generalPartiallyDigitized, graphqlApiKey, graphqlApiUrl, abortController)
  let query = ''
  if (typeof generalPartiallyDigitized !== 'undefined') {
    query = `mutation {
          savePartiallyDigitizedForWebsite(
            itemId: "${itemId}",
            partiallyDigitized: ${generalPartiallyDigitized},
            websiteId: "all",
          ) {
            id
          }
        }
        `
  } else {
    query = `mutation {
          saveDefaultImageForWebsite(
            itemId: "${itemId}",
            defaultFilePath: "${generalDefaultFilePath}",
            objectFileGroupId: "${generalObjectFileGroupId}",
            websiteId: "all",
          ) {
            id
          }
        }
        `
  }
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
}
