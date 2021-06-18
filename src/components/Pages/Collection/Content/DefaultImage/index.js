import React from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Flex,
  Text,
  IconButton,
} from 'theme-ui'
import { MdRemoveCircle } from 'react-icons/md'
import Image from 'components/Shared/Image'
import sx from './sx'

const DefaultImage = ({ imageGroupId, imageUrl, filePath, removeImageFunction, children }) => {
  const sanitizedFileName = (() => {
    const split = decodeURIComponent(filePath).split('/')
    return split[split.length - 1]
  })()

  return imageUrl ? (
    <Box>
      <Image
        src={imageUrl}
        height={200}
        alt=''
        frame
      >
        {removeImageFunction && (
          <IconButton
            sx={sx.removeIcon}
            aria-label='Remove default image'
            title='Remove default image'
            onClick={removeImageFunction}
          >
            <MdRemoveCircle />
          </IconButton>
        )}
      </Image>
      <Box sx={sx.imageInfo}>
        <Flex sx={sx.imageInfoFlex}>
          <Text>{imageGroupId}</Text>
          <Text>{sanitizedFileName}</Text>
          {children}
        </Flex>
      </Box>
    </Box>
  ) : (
    <Flex sx={sx.imageInfoFlex}>
      {children}
    </Flex>
  )
}

DefaultImage.propTypes = {
  imageUrl: PropTypes.string,
  imageGroupId: PropTypes.string,
  filePath: PropTypes.string,
  removeImageFunction: PropTypes.func,
  children: PropTypes.node,
}

export default DefaultImage
