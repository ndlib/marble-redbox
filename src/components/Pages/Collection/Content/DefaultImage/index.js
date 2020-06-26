import React from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Flex,
  IconButton,
  Text,
} from 'theme-ui'
import { MdClear } from 'react-icons/md'
import Image from 'components/Shared/Image'
import UpdateButton from './UpdateButton'
import sx from './sx'

const DefaultImage = ({ imageUrl, itemTitle, inModal }) => {
  const decoded = decodeURIComponent(imageUrl)
  const imageName = decoded.substring(decoded.lastIndexOf('/') + 1)

  const updateButton = !inModal ? (
    <UpdateButton
      selectedImageUrl={imageUrl}
      itemTitle={itemTitle}
    />
  ) : null

  return imageUrl ? (
    <Box>
      <Image
        service={imageUrl}
        height={200}
        alt=''
        frame
      />
      <Box sx={sx.imageInfo}>
        <Flex>
          <Text>{imageName}</Text>
          {!inModal && (
            <IconButton
              ml={2}
              aria-label='Remove'
            >
              <MdClear />
            </IconButton>
          )}
        </Flex>
        {updateButton}
      </Box>
    </Box>
  ) : updateButton
}

DefaultImage.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  itemTitle: PropTypes.string,
  inModal: PropTypes.bool,
}

export default DefaultImage