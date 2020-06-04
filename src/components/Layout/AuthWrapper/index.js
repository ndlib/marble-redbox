import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import AuthContext, { initialContext } from 'context/AuthContext'

const AuthWrapper = ({ children }) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          auth {
            url
            clientId
            issuer
          }
        }
      }
    }
  `)
  const { auth } = data.site.siteMetadata
  const setAuth = (user) => {
    setContext({
      ...context,
      user: user,
    })
  }

  const [context, setContext] = useState({
    ...initialContext,
    authSettings: {
      ...auth,
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
