import React from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Heading,
} from 'theme-ui'
import { MdExpandLess, MdExpandMore } from 'react-icons/md'
import { orderedListStyle } from 'utils/general'
import sx from '../../sx'

const ItemHeading = ({ depth, expanded, onCollapseToggle, children }) => {
  const tooltip = (`${expanded ? 'Collapse' : 'Expand'} ${children}`)
  return (
    <Box
      sx={sx.expandHandle(depth)}
      title={tooltip}
      onClick={onCollapseToggle}
    >
      {expanded ? <MdExpandLess sx={sx.expandIcon} /> : <MdExpandMore sx={sx.expandIcon} />}
      <Box sx={sx.listItemHeader(depth, orderedListStyle(depth))}>
        <Heading as={`h${depth + 2}`}>
          {children}
        </Heading>
      </Box>
    </Box>
  )
}

ItemHeading.propTypes = {
  depth: PropTypes.number,
  expanded: PropTypes.bool,
  onCollapseToggle: PropTypes.func,
  children: PropTypes.string.isRequired,
}

export default ItemHeading
