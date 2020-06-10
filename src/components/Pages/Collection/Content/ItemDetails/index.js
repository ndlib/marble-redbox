import React from 'react'
import PropTypes from 'prop-types'
import { Box } from 'theme-ui'
import Item from './Item'

const ItemDetails = ({ collection, depth }) => {
  return (
    <Box mt={3}>
      <Item item={collection} depth={depth} />
    </Box>
  )
}

ItemDetails.propTypes = {
  collection: PropTypes.shape({
    title: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
      defaultImage: PropTypes.string,
    })).isRequired,
  }).isRequired,
  depth: PropTypes.number,
}

ItemDetails.defaultProps = {
  depth: 0,
}

export default ItemDetails
