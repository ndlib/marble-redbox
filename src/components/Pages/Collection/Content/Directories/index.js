import React from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Flex,
  IconButton,
  Text,
} from 'theme-ui'
import { MdClear } from 'react-icons/md'
import { useDirectoriesContext } from 'context/DirectoriesContext'

const Content = ({ labelSx, valueSx }) => {
  const { directories } = useDirectoriesContext()
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

Content.propTypes = {
  labelSx: PropTypes.object,
  valueSx: PropTypes.object,
}

export default Content
