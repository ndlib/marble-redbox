import React from 'react'
import PropTypes from 'prop-types'
import { Flex } from 'theme-ui'
import sx from './sx'

const ActionButtons = ({ children }) => {
  return (
    <Flex sx={sx.container}>
      {children}
    </Flex>
  )
}

ActionButtons.propTypes = {
  children: PropTypes.node,
}

export default ActionButtons
