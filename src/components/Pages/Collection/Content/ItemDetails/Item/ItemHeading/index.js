import React from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Heading,
  IconButton,
} from 'theme-ui'
import { MdExpandLess, MdExpandMore, MdLaunch } from 'react-icons/md'
import { orderedListStyle } from 'utils/general'
import { useStaticQuery, graphql } from 'gatsby'
import sx from '../../sx'

const ItemHeading = ({ itemId, depth, expanded, onCollapseToggle, children }) => {
  const data = useStaticQuery(graphql`
    query ItemHeadingMarbleUrlQuery {
      site {
        siteMetadata {
          marbleUrl
        }
      }
    }
  `)
  const itemUrl = `${data.site.siteMetadata.marbleUrl}/item/${itemId}`
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
        <IconButton
          ml={2}
          aria-label='View in MARBLE'
        >
          <a href={itemUrl} target='_blank' rel='noopener noreferrer'>
            <MdLaunch />
          </a>
        </IconButton>
      </Box>
    </Box>
  )
}

ItemHeading.propTypes = {
  itemId: PropTypes.string,
  depth: PropTypes.number,
  expanded: PropTypes.bool,
  onCollapseToggle: PropTypes.func,
  children: PropTypes.string.isRequired,
}

export default ItemHeading
