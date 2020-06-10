import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Heading,
} from 'theme-ui'
import { MdExpandLess, MdExpandMore } from 'react-icons/md'
import { orderedListStyle } from 'utils/general'
import DefaultImage from './DefaultImage'
import sx from '../sx'

const Item = ({ item, depth }) => {
  const [expanded, setExpanded] = useState(true)
  const tooltip = (`${expanded ? 'Collapse' : 'Expand'} ${item.title}`)

  return (
    <Box>
      <Box
        sx={sx.expandHandle(depth)}
        title={tooltip}
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? <MdExpandLess sx={sx.expandIcon} /> : <MdExpandMore sx={sx.expandIcon} />}
        <Box sx={sx.listItemHeader(depth, orderedListStyle(depth))}>
          <Heading as={`h${depth + 2}`}>
            {item.title}
          </Heading>
        </Box>
      </Box>
      {expanded && (
        <Box>
          {item.level !== 'collection' && (
            <Box ml={`${depth + 2}rem`} mb='1rem'>
              <DefaultImage imageUrl={item.defaultImage} itemTitle={item.title} />
            </Box>
          )}
          {item.items.map((item, idx) => (
            <Item key={item.id} item={item} depth={depth + 1} index={idx} />
          ))}
        </Box>
      )}
    </Box>
  )
}

Item.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    level: PropTypes.string.isRequired,
    defaultImage: PropTypes.string,
    items: PropTypes.array.isRequired,
  }).isRequired,
  depth: PropTypes.number,
}

Item.defaultProps = {
  depth: 0,
  index: 0,
}

export default Item
