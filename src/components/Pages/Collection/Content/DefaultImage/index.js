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

const DefaultImage = ({ collectionId, itemId, objectFileGroupId, imageUrl, itemTitle, inModal, updateItemFunction }) => {
  const decoded = decodeURIComponent(imageUrl)
  const imageName = decoded.substring(decoded.lastIndexOf('/') + 1)
  const updateButton = !inModal ? (
    <UpdateButton
      selectedImageUrl={imageUrl}
      objectFileGroupId={objectFileGroupId}
      itemTitle={itemTitle}
      collectionId={collectionId}
      itemId={itemId}
      updateItemFunction={updateItemFunction}
    />
  ) : null

  if (imageUrl) {
    imageUrl = imageUrl.replace(/[/]/g, '%2F')
    imageUrl = imageUrl.replace('.tif', '').replace('.jpg', '')
    imageUrl = 'https://image-iiif.library.nd.edu/iiif/2/' + imageUrl + '/full/250,/0/default.jpg'
  }
  return imageUrl ? (
    <Box>
      <Image
        src={imageUrl}
        height={200}
        alt=''
        frame
      />
      <Box sx={sx.imageInfo}>
        <Flex>
          <Text>{imageName}</Text>
        </Flex>
        {updateButton}
      </Box>
    </Box>
  ) : updateButton
}

DefaultImage.propTypes = {
  imageUrl: PropTypes.string,
  itemTitle: PropTypes.string,
  inModal: PropTypes.bool,
}

export default DefaultImage
