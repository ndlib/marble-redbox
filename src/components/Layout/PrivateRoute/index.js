import React, { Component, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { navigate } from 'gatsby'
import OktaAuth from '@okta/okta-auth-js'
import Loading from 'components/Layout/Loading'
import { useAuthContext } from 'context/AuthContext'

const PrivateRoute = ({ component: Component, location, ...props }) => {
  const [shouldRender, setShouldRender] = useState(false)
  const { authSettings, user, setAuth } = useAuthContext()

  useEffect(() => {
    if (user) {
      setShouldRender(true)
    }
    if (!user && location.pathname !== '/user') {
      const authClient = new OktaAuth({
        ...authSettings,
        redirectUri: `${location.origin}/user`,
      })
      authClient.tokenManager.get('idToken')
        .then(idToken => {
          if (idToken) {
            setAuth(idToken.claims)
            setShouldRender(true)
          } else {
            // You're not logged in, you need a sessionToken
            navigate('/user')
          }
        })
    }
  }, [location, user, authSettings, setAuth, setShouldRender])
  return shouldRender ? <Component location={location} {...props} /> : <Loading />
}

PrivateRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  location: PropTypes.shape({
    hash: PropTypes.string,
    origin: PropTypes.string.isRequired,
    pathname: PropTypes.string.isRequired,
  }).isRequired,
}
export default PrivateRoute
