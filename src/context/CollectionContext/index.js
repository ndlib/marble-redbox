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
    getMarbleItems(id: "${id}") {
      id
      title
      level
      objectFileGroupId
      collectionId
      defaultImageId
      redbox {
        generalDefaultImageId
        generalObjectFileGroupId
        generalPartiallyDigitized
      }
      items (limit: 1000){
        items {
          id
          title
          level
          objectFileGroupId
          collectionId
          defaultImageId
          redbox {
            generalDefaultImageId
            generalObjectFileGroupId
            generalPartiallyDigitized
          }
          files {
            items {
              id
              label
              fileId
            }
          }
        }
      }
      files {
        items {
          id
          label
          fileId
        }
      }
    }
  }
  `
}

const updateOverwrittenItemData = (data) => {
  if (data.redbox) {
    if (data.redbox.generalDefaultImageId) {
      data.defaultImageId = data.redbox.generalDefaultImageId
    }
    if (data.redbox.generalObjectFileGroupId) {
      data.objectFileGroupId = data.redbox.generalObjectFileGroupId
    }
    if (data.redbox.generalPartiallyDigitized) {
      data.partiallyDigitized = data.redbox.generalPartiallyDigitized
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
      console.log('here')
      return result.json()
    })
    .then((data) => {
      console.log('fetch result=', data)
      const result = data.data.getMarbleItems
      return updateOverwrittenItemData(result)
    })
}
