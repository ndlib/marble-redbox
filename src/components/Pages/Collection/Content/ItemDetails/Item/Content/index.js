import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Heading,
} from 'theme-ui'
import EditMetadataForm from '../../../EditMetadataForm'
import DefaultImage from '../../../DefaultImage'
import DefaultImageButton from '../../../DefaultImageButton'
import AddMediaButton from '../../../AddMediaButton'
import ItemHeading from '../ItemHeading'
import MediaList from '../MediaList'
import typy from 'typy'
import Item from '../'

const Content = ({ item, depth, updateItemFunction, updateCopyrightFunction }) => {
  const [expanded, setExpanded] = useState(false)

  let thumbnail = ''
  const defaultImage = determineDefaultImage(item)
  if (defaultImage) {
    thumbnail = defaultImage.mediaServer + '/' + defaultImage.mediaResourceId + '/full/250,/0/default.jpg'
  }

  const removeImageFunction = () => {
    return updateItemFunction({
      itemId: item.id,
      generalDefaultFilePath: null,
      generalImageGroupId: '',
    })
  }

  const removeMediaFunction = () => {
    return updateItemFunction({
      itemId: item.id,
      generalMediaGroupId: '',
    })
  }

  return (
    <Box id={item.id}>
      <ItemHeading
        itemId={item.id}
        depth={depth}
        expanded={expanded}
        onCollapseToggle={() => setExpanded(!expanded)}
      >
        {item.title}
      </ItemHeading>
      <Box sx={{ display: expanded ? 'block' : 'none' }}>
        {item.level !== 'collection' && (
          <Box ml={`${depth + 4}rem`} mb='1rem'>
            {thumbnail && (
              <EditMetadataForm
                updateItemFunction={updateItemFunction}
                updateCopyrightFunction={updateCopyrightFunction}
                item={item}
              />
            )}
            <Heading as='h4' sx={{ color: 'gray', display: 'block', fontSize: 3, my: '5px' }}>{item.uniqueIdentifier}</Heading>
            <DefaultImage
              imageUrl={thumbnail}
              imageGroupId={item.imageGroupId}
              filePath={defaultImage?.mediaResourceId}
              removeImageFunction={removeImageFunction}
            >
              <DefaultImageButton
                selectedImage={defaultImage}
                imageGroupId={item.imageGroupId}
                itemTitle={item.title}
                collectionId={item.collectionId}
                itemId={item.id}
                updateItemFunction={updateItemFunction}
              />
              <AddMediaButton
                updateItemFunction={updateItemFunction}
                mediaGroupId={item.mediaGroupId}
                imageGroupId={item.imageGroupId}
                selectedImage={defaultImage}
                itemTitle={item.title}
                collectionId={item.collectionId}
                itemId={item.id}
              />
            </DefaultImage>
            <MediaList media={item.media?.items} removeMediaFunction={removeMediaFunction} />
          </Box>
        )}
        {typy(item, 'children.items').safeArray.map((child, idx) => (
          <Item updateItemFunction={updateItemFunction} key={child.id} item={child} depth={depth + 1} index={idx} />
        ))}
      </Box>
    </Box>
  )
}

const determineDefaultImage = (item) => {
  if (item.defaultImage) {
    return item.defaultImage
  }
  if (item.images && item.images.items) {
    return item.images.items[0]
  }

  return null
}

Content.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    level: PropTypes.string.isRequired,
    imageGroupId: PropTypes.string,
    mediaGroupId: PropTypes.string,
    collectionId: PropTypes.string.isRequired,
    defaultFilePath: PropTypes.string,
    partiallyDigitized: PropTypes.bool,
    items: PropTypes.array,
    media: PropTypes.shape({
      items: PropTypes.array,
    }),
  }).isRequired,
  depth: PropTypes.number,
  updateItemFunction: PropTypes.func.isRequired,
  updateCopyrightFunction: PropTypes.func.isRequired,
}

Content.defaultProps = {
  depth: 0,
  index: 0,
}

export default Content
