import { createContext, useContext } from 'react'
export const initialContext = {
  mediaGroup: null,
  setMediaGroup: () => {},
}
export const MediaGroupContext = createContext(initialContext)
export const useMediaGroupContext = () => useContext(MediaGroupContext)
export default MediaGroupContext
