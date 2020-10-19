import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Box,
} from 'theme-ui'
import PartiallyDigitized from '../../PartiallyDigitized'
import DefaultImage from '../../DefaultImage'
import ItemHeading from './ItemHeading'
import typy from 'typy'

const Item = ({ item, depth }) => {
  const [expanded, setExpanded] = useState(true)
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
          <Box ml={`${depth + 2}rem`} mb='1rem'>
            {item.defaultImage && (
              <PartiallyDigitized
                defaultChecked={item.partiallyDigitized}
                labelSx={{ mb: 2 }}
              />
            )}
            <p>{item.objectFileGroupId}</p>

            <DefaultImage imageUrl={item.defaultImage} itemTitle={item.title} collectionId={item.collectionId} itemId={item.id} />
          </Box>
        )}
        {typy(item, 'items.items').safeArray.map((item, idx) => (
          <Item key={item.id} item={item} depth={depth + 1} index={idx} />
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
    defaultImage: PropTypes.string,
    partiallyDigitized: PropTypes.bool,
    items: PropTypes.object .isRequired,
  }).isRequired,
  depth: PropTypes.number,
}

Item.defaultProps = {
  depth: 0,
  index: 0,
}

export default Item
