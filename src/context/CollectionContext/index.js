import { createContext, useContext } from 'react'
export const initialContext = {
  collection: null,
  updateCollection: () => {},
}
export const CollectionContext = createContext(initialContext)
export const useCollectionContext = () => useContext(CollectionContext)
export default CollectionContext