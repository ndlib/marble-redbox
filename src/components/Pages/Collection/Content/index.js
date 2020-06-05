import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Divider,
  Flex,
  Heading,
} from 'theme-ui'
import SourceId from './SourceId'
import PartiallyDigitized from './PartiallyDigitized'
import Directories from './Directories'
import ItemDetails from './ItemDetails'
import ImageGroups from './ImageGroups'
import { dummyDirectories } from './dummyData'
import sx from './sx'

const Content = ({ collection }) => {
  const [directories, setDirectories] = useState(dummyDirectories)

  return (
    <div>
      <Flex sx={sx.headingRow}>
        <Heading as='h1' sx={sx.heading}>Edit {collection.title}</Heading>
        <Button sx={sx.viewerButton}>Open in Mirador</Button>
      </Flex>
      <Flex sx={sx.topControls}>
        <Flex sx={sx.collectionInfo}>
          <SourceId labelSx={sx.label} valueSx={sx.values} />
          <PartiallyDigitized labelSx={sx.label} valueSx={sx.values} />
          <Directories directories={directories} labelSx={sx.label} valueSx={sx.values} />
        </Flex>
        <Flex sx={sx.buttons}>
          <Button>Re-Sync Metadata</Button>
          <Button>Build Manifest</Button>
          <Button>Add Directory</Button>
        </Flex>
      </Flex>
      <Divider />
      <Flex sx={sx.itemSection}>
        <ItemDetails collection={collection} />
        <ImageGroups directories={directories} />
      </Flex>
    </div>
  )
}

Content.propTypes = {
  collection: PropTypes.shape({
    title: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired,
  }).isRequired,
}

export default Content
