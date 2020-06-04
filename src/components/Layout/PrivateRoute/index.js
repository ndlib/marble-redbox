import React, { Component, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { navigate } from 'gatsby'
import OktaAuth from '@okta/okta-auth-js'
import Loading from 'components/Layout/Loading'
import { useAuthContext } from 'context/AuthContext'

const PrivateRoute = ({ component: Component, location, ...props }) => {
  const [content, setContent] = useState(<Loading />)
  const { authSettings, user, setAuth } = useAuthContext()
  const render = <Component location={location} {...props} />

  useEffect(() => {
    if (user) {
      setContent(render)
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
            setContent(render)
          } else {
            // You're not logged in, you need a sessionToken
            navigate('/user')
          }
        })
    }
  }, [location, render, user, authSettings, setAuth])
  return <>{content}</>
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
