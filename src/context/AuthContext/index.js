import { createContext, useContext } from 'react'
export const initialContext = {
  authSettings: {},
  token: null,
  user: null,
  setAuth: () => {},
}
export const AuthContext = createContext(initialContext)
export const useAuthContext = () => useContext(AuthContext)
export default AuthContext
