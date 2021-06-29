import { createContext, useContext } from 'react'
export const initialContext = {
  imageDirectories: null,
  mediaDirectories: null,
  setImageDirectories: () => {},
  setMediaDirectories: () => {},
}
export const DirectoriesContext = createContext(initialContext)
export const useDirectoriesContext = () => useContext(DirectoriesContext)
export default DirectoriesContext
