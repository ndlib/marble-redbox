import React from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Flex,
  IconButton,
  Text,
} from 'theme-ui'
import { MdModeEdit } from 'react-icons/md'

const SourceId = ({ labelSx, valueSx }) => {
  return (
    <div>
      <Text sx={labelSx}>Source ID:</Text>
      <Box sx={valueSx}>
        <Flex>
          dummy.value
          <IconButton
            ml={2}
            aria-label='Edit'
          >
            <MdModeEdit />
          </IconButton>
        </Flex>
      </Box>
    </div>
  )
}

SourceId.propTypes = {
  labelSx: PropTypes.object,
  valueSx: PropTypes.object,
}

export default SourceId
