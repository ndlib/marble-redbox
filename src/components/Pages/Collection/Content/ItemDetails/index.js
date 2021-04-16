import React from 'react'
import PropTypes from 'prop-types'
import typy from 'typy'
import { Box } from 'theme-ui'
import { useCollectionContext } from 'context/CollectionContext'
import Item from './Item'
import Search from './Search'
import sx from './sx'

const ItemDetails = ({ depth, updateItemFunction }) => {
  const { collection } = useCollectionContext()
  const searchFields = ['title', 'defaultImage', 'id', 'collectionId']

  const itemFilterRecursive = (item, searchTerms) => {
    // Return true if this item or any of its children contain ALL search terms in searchable field(s)
    return searchTerms.every(term => {
      return searchFields.some((field) => typy(item[field]).safeString.toLowerCase().includes(term))
    }) || typy(item, 'items').safeArray.some(child => itemFilterRecursive(child, searchTerms))
  }

  const filter = (event) => {
    const inputTerms = typy(event, 'target.value').safeString.toLowerCase().split(' ')
    const outData = Object.assign({}, collection)
    outData.items = collection.children.items.filter((item) => itemFilterRecursive(item, inputTerms))
    return outData
  }

  return (
    <Box mt={3}>
      <Box sx={sx.itemsList}>
        <Item item={collection} depth={depth} updateItemFunction={updateItemFunction} />
      </Box>
    </Box>
  )
}

ItemDetails.propTypes = {
  depth: PropTypes.number,
  updateItemFunction: PropTypes.func.isRequired,
}

ItemDetails.defaultProps = {
  depth: 0,
}

export default ItemDetails
