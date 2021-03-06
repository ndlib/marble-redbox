import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import AuthContext, { initialContext } from 'context/AuthContext'

const AuthWrapper = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteAuthQuery {
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

  const setAuth = (token, user) => {
    setContext({
      ...context,
      token: token,
      user: user,
    })
  }

  const [context, setContext] = useState({
    ...initialContext,
    authSettings: {
      url: data.site.siteMetadata.auth.url,
      clientId: data.site.siteMetadata.auth.clientId,
      issuer: data.site.siteMetadata.auth.issuer,
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
