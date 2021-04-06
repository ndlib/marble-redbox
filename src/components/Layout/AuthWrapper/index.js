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

  const setAuth = (user) => {
    setContext({
      ...context,
      user: user,
    })
  }
  console.log(data, data.SiteAuthQuery)
  const [context, setContext] = useState({
    ...initialContext,
    authSettings: {
      url: data.SiteAuthQuery.site.siteMetadata.auth.authClientURL,
      clientId: data.SiteAuthQuery.site.siteMetadata.auth.authClientClientId,
      issuer: data.SiteAuthQuery.site.siteMetadata.auth.authClientIssuer,
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
