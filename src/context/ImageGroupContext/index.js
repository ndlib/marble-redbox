import { createContext, useContext } from 'react'
export const initialContext = {
  imageGroup: null,
  setImageGroup: () => {},
}
export const ImageGroupContext = createContext(initialContext)
export const useImageGroupContext = () => useContext(ImageGroupContext)
export default ImageGroupContext
