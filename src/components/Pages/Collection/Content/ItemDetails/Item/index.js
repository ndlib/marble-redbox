import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Box,
} from 'theme-ui'
import PartiallyDigitized from '../../PartiallyDigitized'
import DefaultImage from '../../DefaultImage'
import ItemHeading from './ItemHeading'
import typy from 'typy'

const Item = ({ item, depth, updateItemFunction }) => {
  const [expanded, setExpanded] = useState(true)
  let thumbnail = typy(item, 'defaultFile.filePath').safeString
  if (thumbnail) {
    thumbnail = thumbnail.replace(/[/]/g, '%2F')
    thumbnail = thumbnail.replace('.tif', '').replace('.jpg', '')
    thumbnail = item.defaultFile.iiifImageServiceUri + '/' + thumbnail + '/full/250,/0/default.jpg'
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
            {thumbnail && (
              <PartiallyDigitized
                itemId={item.id}
                defaultChecked={item.partiallyDigitized}
                labelSx={{ mb: 2 }}
                updateItemFunction={updateItemFunction}
              />
            )}
            <DefaultImage updateItemFunction={updateItemFunction} objectFileGroupId={item.objectFileGroupId} imageUrl={thumbnail} itemTitle={item.title} collectionId={item.collectionId} itemId={item.id} />
            <p>{item.objectFileGroupId}</p>
          </Box>
        )}
        {typy(item, 'items').safeArray.map((item, idx) => (
          <Item updateItemFunction={updateItemFunction} key={item.id} item={item} depth={depth + 1} index={idx} />
        ))}
      </Box>
    </Box>
  )
}

Item.propTypes = {
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

Item.defaultProps = {
  depth: 0,
  index: 0,
}

export default Item
