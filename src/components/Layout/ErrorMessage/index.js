import React from 'react'
import PropTypes from 'prop-types'

const ErrorMessage = ({ error }) => {
  return (
    <code>{JSON.stringify(error)}</code>
  )
}

ErrorMessage.propTypes = {
  error: PropTypes.object.isRequired,
}

export default ErrorMessage
