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
      defaultFilePath
      partiallyDigitized
      children {
        items {
          id
          title
          level
          objectFileGroupId
          collectionId
          defaultFilePath
          partiallyDigitized
          files {
            items {
              id
              label
              objectFileGroupId
            }
          }
        }
      }
      files {
        items {
          id
          label
          objectFileGroupId
        }
      }
    }
  }
  `
}

const updateOverwrittenItemData = (data) => {
  if (data.metadataAugmentation) {
    if (data.metadataAugmentation.generalDefaultFilePath) {
      data.defaultFilePath = data.metadataAugmentation.generalDefaultFilePath
    }
    if (data.metadataAugmentation.generalObjectFileGroupId) {
      data.objectFileGroupId = data.metadataAugmentation.generalObjectFileGroupId
    }
    if (data.metadataAugmentation.generalPartiallyDigitized) {
      data.partiallyDigitized = data.metadataAugmentation.generalPartiallyDigitized
    }
  }

  if (data.items && data.items.items) {
    data.items.items.forEach(item => updateOverwrittenItemData(item))
  }

  return data
}

export const fetchAndParseCollection = (id, abortController) => {
  const query = collectionGrapgqlQuery(id)
  console.log(query)
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
