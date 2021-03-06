/** @jsx jsx */
import { jsx } from 'theme-ui'
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { navigate } from 'gatsby'
import { OktaAuth } from '@okta/okta-auth-js'
import Loading from 'components/Layout/Loading'
import LoginButton from './LoginButton'
import { useAuthContext } from 'context/AuthContext'

const Login = ({ location }) => {
  const [content, setContent] = useState(<Loading />)
  const { authSettings, user, setAuth } = useAuthContext()
  const redirectPath = '/collection'

  if (!authSettings || !authSettings.clientId) {
    return ('No Login For YOU!')
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (user) {
      navigate(redirectPath)
    } else if (authSettings) {
      const authClient = new OktaAuth({
        ...authSettings,
        redirectUri: `${location.origin}/user`,
      })
      if (authClient) {
        authClient.tokenManager.get('idToken')
          .then(idToken => {
            if (idToken) {
              setAuth(idToken.value, idToken.claims)
              navigate(redirectPath)
              // If ID Token isn't found, try to parse it from the current URL
            } else if (location.hash) {
              authClient.token.parseFromUrl()
                .then(res => {
                  const { idToken } = res.tokens
                  authClient.tokenManager.add('idToken', idToken)
                  setAuth(idToken.value, idToken.claims)
                  navigate(redirectPath)
                })
            } else {
              // You're not logged in, you need a sessionToken
              // Redirect to Okta login page
              setContent(<LoginButton authClient={authClient} />)
            }
          })
      }
    }
  }, [location, user, authSettings, setAuth])

  return <React.Fragment>{content}</React.Fragment>
}

Login.propTypes = {
  location: PropTypes.shape({
    hash: PropTypes.string,
    origin: PropTypes.string.isRequired,
    pathname: PropTypes.string.isRequired,
  }).isRequired,
}
export default Login
