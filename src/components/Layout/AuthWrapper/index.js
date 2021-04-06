import React, { useState } from 'react'
import PropTypes from 'prop-types'
import AuthContext, { initialContext } from 'context/AuthContext'
const authClientURL = process.env.AUTH_CLIENT_URL
const authClientClientId = process.env.AUTH_CLIENT_ID
const authClientIssuer = process.env.AUTH_CLIENT_ISSUER

console.log(process.env)

const AuthWrapper = ({ children }) => {
  const setAuth = (user) => {
    setContext({
      ...context,
      user: user,
    })
  }

  const [context, setContext] = useState({
    ...initialContext,
    authSettings: {
      url: authClientURL,
      clientId: authClientClientId,
      issuer: authClientIssuer,
      ignoreSignature: true,
      responseType: 'id_token',
      responseMode: 'fragment',
      pkce: true,
    },
    setAuth: setAuth,
  })
  return (
    <AuthContext.Provider value={context}>
      {children}
    </AuthContext.Provider>
  )
}
AuthWrapper.propTypes = {
  children: PropTypes.node.isRequired,
}
export default AuthWrapper
