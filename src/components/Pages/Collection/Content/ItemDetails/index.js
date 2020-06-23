import React from 'react'
import PropTypes from 'prop-types'
import { Box } from 'theme-ui'
import { useCollectionContext } from 'context/CollectionContext'
import Item from './Item'
import sx from './sx'

const ItemDetails = ({ depth }) => {
  const { collection } = useCollectionContext()
  return (
    <Box mt={3}>
      <Box sx={sx.itemsList}>
        <Item item={collection} depth={depth} />
      </Box>
    </Box>
  )
}

ItemDetails.propTypes = {
  depth: PropTypes.number,
}

ItemDetails.defaultProps = {
  depth: 0,
}

export default ItemDetails
