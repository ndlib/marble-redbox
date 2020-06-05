import React from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Flex,
  IconButton,
  Text,
} from 'theme-ui'
import { MdClear } from 'react-icons/md'

const SourceId = ({ directories, labelSx, valueSx }) => {
  return (
    <div>
      <Text sx={labelSx}>Directories:</Text>
      <Box sx={valueSx}>
        {directories.map((directory) => (
          <Flex key={directory.path}>
            <Text>{directory.path}</Text>
            <IconButton
              ml={2}
              aria-label='Remove'
            >
              <MdClear />
            </IconButton>
          </Flex>
        ))}
      </Box>
    </div>
  )
}

SourceId.propTypes = {
  directories: PropTypes.array.isRequired,
  labelSx: PropTypes.object,
  valueSx: PropTypes.object,
}

export default SourceId
