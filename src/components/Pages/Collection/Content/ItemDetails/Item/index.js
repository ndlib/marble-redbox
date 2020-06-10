import React from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Heading,
} from 'theme-ui'
import { convertToRoman } from 'utils/general'
import DefaultImage from './DefaultImage'

const Item = ({ item, depth, index }) => {
  let headingPrefix = index + 1
  if (depth < 2) {
    headingPrefix = (depth === 0)
      ? convertToRoman(headingPrefix).toUpperCase()
      : convertToRoman(headingPrefix).toLowerCase()
  }
  return (
    <Box>
      <Heading as={`h${depth + 2}`} ml={`${depth}rem`}>
        {headingPrefix}. {item.title}
      </Heading>
      {item.level !== 'collection' && (
        <Box ml={`${depth + 1}rem`} mb='1rem'>
          <DefaultImage imageUrl={item.defaultImage} itemTitle={item.title} />
        </Box>
      )}
      {item.items.map((item, idx) => (
        <Item key={item.id} item={item} depth={depth + 1} index={idx} />
      ))}
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
  index: PropTypes.number,
}

Item.defaultProps = {
  depth: 0,
  index: 0,
}

export default Item
