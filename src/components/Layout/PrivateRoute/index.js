import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { navigate } from 'gatsby'
import { isLoggedIn } from 'utils/auth'
const PrivateRoute = ({ component: Component, location, ...props }) => {
  if (!isLoggedIn() && location.pathname !== '/login') {
    navigate('/login')
    return null
  }
  return <Component location={location} {...props} />
}

PrivateRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
}
export default PrivateRoute
