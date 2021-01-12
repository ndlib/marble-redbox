import { createContext, useContext } from 'react'
export const initialContext = {
  directories: null,
  setDirectories: () => {},
  lastAccessedDirectory: null,
  setLastAccessedDirectory: () => {},
}
export const DirectoriesContext = createContext(initialContext)
export const useDirectoriesContext = () => useContext(DirectoriesContext)
export default DirectoriesContext
