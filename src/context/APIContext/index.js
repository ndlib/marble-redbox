import { createContext, useContext } from 'react'
export const initialContext = {
  collectionsURL: null,
  directoriesURL: null,
  setAPIs: () => {},
}
export const APIContext = createContext(initialContext)
export const useAPIContext = () => useContext(APIContext)
export default APIContext
