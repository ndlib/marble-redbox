import React from 'react'
import PropTypes from 'prop-types'
import {
  Divider,
  Flex,
  Heading,
} from 'theme-ui'
import { useCollectionContext } from 'context/CollectionContext'
import ItemDetails from './ItemDetails'
import EditMetadataForm from './EditMetadataForm'
import SourceId from './SourceId'

import sx from './sx'

const Content = ({ updateItemFunction }) => {
  const { collection } = useCollectionContext()
  return (
    <div>
      <Flex sx={sx.headingRow}>
        <Heading as='h1' sx={sx.heading}>{collection.title}</Heading>
      </Flex>
      <SourceId labelSx={sx.label} valueSx={sx.values} />
      <EditMetadataForm updateItemFunction={updateItemFunction} item={collection} startExpanded />
      <Divider />

      <Flex sx={sx.itemSection}>
        <ItemDetails collection={collection} updateItemFunction={updateItemFunction} />
      </Flex>
    </div>
  )
}

Content.propTypes = {
  updateItemFunction: PropTypes.func.isRequired,
}
export default Content
