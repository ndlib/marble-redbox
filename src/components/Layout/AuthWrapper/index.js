import React, { useState } from 'react'
import PropTypes from 'prop-types'
import AuthContext, { initialContext } from 'context/AuthContext'

const AuthWrapper = ({ children }) => {
  const setAuth = (user) => {
    setContext({
      ...context,
      user: user,
    })
  }
  /**
  remove authe settings for now
  authSettings: {
    url: process.env.AUTH_CLIENT_URL,
    clientId: process.env.AUTH_CLIENT_ID,
    issuer: process.env.AUTH_CLIENT_ISSUER,
    ignoreSignature: true,
    responseType: 'id_token',
    responseMode: 'fragment',
    pkce: true,
  },
  */
  const [context, setContext] = useState({
    ...initialContext,
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
