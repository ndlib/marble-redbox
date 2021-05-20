import React from 'react'
import PropTypes from 'prop-types'
import {
  Divider,
  Flex,
  Heading,
} from 'theme-ui'
import { useStaticQuery, graphql } from 'gatsby'
import { useCollectionContext } from 'context/CollectionContext'
import ItemDetails from './ItemDetails'
import EditMetadataForm from './EditMetadataForm'
import SourceId from './SourceId'

import sx from './sx'

const Content = ({ updateItemFunction }) => {
  const { collection } = useCollectionContext()
  const data = useStaticQuery(graphql`
    query MarbleUrlQuery {
      site {
        siteMetadata {
          marbleUrl
        }
      }
    }
  `)
  const itemUrl = `${data.site.siteMetadata.marbleUrl}/item/${collection.collectionId}`

  return (
    <div>
      <Flex sx={sx.headingRow}>
        <Heading as='h1' sx={sx.heading}>{collection.title}</Heading>
      </Flex>
      <SourceId labelSx={sx.label} valueSx={sx.values} />
      <Flex>
        <a href={itemUrl} target='_blank' rel='noopener noreferrer'>
          View in MARBLE
        </a>
      </Flex>
      <EditMetadataForm updateItemFunction={updateItemFunction} item={collection} startExpanded />
      <Divider />

      <Flex sx={sx.itemSection}>
        <ItemDetails collection={collection} />
      </Flex>
    </div>
  )
}

Content.propTypes = {
  updateItemFunction: PropTypes.func.isRequired,
}
export default Content
