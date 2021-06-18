import React from 'react'
import PropTypes from 'prop-types'

const ErrorMessage = ({ error }) => {
  if (error instanceof Error) {
    error = error.toString()
  }
  return (
    <code>{JSON.stringify(error)}</code>
  )
}

ErrorMessage.propTypes = {
  error: PropTypes.object.isRequired,
}

export default ErrorMessage
