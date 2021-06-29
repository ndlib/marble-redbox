import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Checkbox,
} from 'theme-ui'
import EditMetadataForm from '../../../EditMetadataForm'
import DefaultImage from '../../../DefaultImage'
import DefaultImageButton from '../../../DefaultImageButton'
import AddMediaButton from '../../../AddMediaButton'
import ItemHeading from '../ItemHeading'
import typy from 'typy'
import Item from '../'

const Content = ({ item, depth, updateItemFunction }) => {
  const [expanded, setExpanded] = useState(true)

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
            {thumbnail && (<EditMetadataForm updateItemFunction={updateItemFunction} item={item} />)}
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
                imageUrl={thumbnail}
                itemTitle={item.title}
                collectionId={item.collectionId}
                itemId={item.id}
              />
            </DefaultImage>
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
  }).isRequired,
  depth: PropTypes.number,
  updateItemFunction: PropTypes.func.isRequired,
}

Content.defaultProps = {
  depth: 0,
  index: 0,
}

export default Content
