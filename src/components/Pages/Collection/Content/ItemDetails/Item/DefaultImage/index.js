import React from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Button,
  Flex,
  IconButton,
  Text,
} from 'theme-ui'
import { MdClear } from 'react-icons/md'
import Image from 'components/Shared/Image'
import sx from './sx'

const DefaultImage = ({ imageUrl, itemTitle, onChange }) => {
  const decoded = decodeURIComponent(imageUrl)
  const imageName = decoded.substring(decoded.lastIndexOf('/') + 1)
  return imageUrl ? (
    <Box>
      <Image
        service={imageUrl}
        height={200}
        alt={`Default image for ${itemTitle}`}
        frame
      />
      <Box sx={sx.imageInfo}>
        <Flex>
          <Text>{imageName}</Text>
          <IconButton
            ml={2}
            aria-label='Remove'
          >
            <MdClear />
          </IconButton>
        </Flex>
        <Button>Change Default Image</Button>
      </Box>
    </Box>
  ) : (
    <Button>Set Default Image</Button>
  )
}

DefaultImage.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  itemTitle: PropTypes.string,
  onChange: PropTypes.func,
}

export default DefaultImage
