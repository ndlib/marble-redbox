import { createContext, useContext } from 'react'
export const initialContext = {
  imageDirectories: null,
  imageDirectoriesReferenced: [],
  mediaDirectories: null,
  mediaDirectoriesReferenced: [],
  setImageDirectories: () => {},
  setImageDirectoriesReferenced: () => {},
  setMediaDirectories: () => {},
  setMediaDirectoriesReferenced: () => {},
}
export const DirectoriesContext = createContext(initialContext)
export const useDirectoriesContext = () => useContext(DirectoriesContext)
export default DirectoriesContext
