import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Box,
} from 'theme-ui'
import EditMetadataForm from '../../../EditMetadataForm'
import DefaultImage from '../../../DefaultImage'
import ItemHeading from '../ItemHeading'
import typy from 'typy'
import Item from '../'

export const fetchStatus = {
  FETCHING: 'FETCHING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
}

const Content = ({ item, depth, updateItemFunction }) => {
  const [expanded, setExpanded] = useState(true)

  let thumbnail = ''
  const defaultFile = determineDefaultFile(item)
  if (defaultFile) {
    thumbnail = defaultFile.mediaServer + '/' + defaultFile.mediaResourceId + '/full/250,/0/default.jpg'
  }

  return (
    <Box>
      <ItemHeading
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
            <DefaultImage updateItemFunction={updateItemFunction} objectFileGroupId={item.objectFileGroupId} imageUrl={thumbnail} itemTitle={item.title} collectionId={item.collectionId} itemId={item.id} />
            <p>{item.objectFileGroupId}</p>
          </Box>
        )}
        {typy(item, 'children.items').safeArray.map((child, idx) => (
          <Item updateItemFunction={updateItemFunction} key={child.id} item={child} depth={depth + 1} index={idx} />
        ))}
      </Box>
    </Box>
  )
}

const determineDefaultFile = (item) => {
  if (item.defaultFile) {
    return item.defaultFile
  }
  if (item.files && item.files.items) {
    return item.files.items[0]
  }

  return false
}

Content.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    level: PropTypes.string.isRequired,
    objectFileGroupId: PropTypes.string,
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
