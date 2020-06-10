import React from 'react'
import PropTypes from 'prop-types'
import { Box } from 'theme-ui'
import Item from './Item'
import sx from './sx'

const ItemDetails = ({ collection, depth }) => {
  return (
    <Box mt={3} sx={sx.itemsList}>
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
