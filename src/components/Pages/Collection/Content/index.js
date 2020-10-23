import React from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Divider,
  Flex,
  Heading,
} from 'theme-ui'
import { useCollectionContext } from 'context/CollectionContext'
import SourceId from './SourceId'
import PartiallyDigitized from './PartiallyDigitized'
import ItemDetails from './ItemDetails'
import ImageGroups from './ImageGroups'
import sx from './sx'

const Content = ({ updateItemFunction }) => {
  const { collection } = useCollectionContext()
  return (
    <div>
      <Flex sx={sx.headingRow}>
        <Heading as='h1' sx={sx.heading}>Edit {collection.title}</Heading>
        <Button sx={sx.viewerButton}>Open in Mirador</Button>
      </Flex>
      <Flex sx={sx.topControls}>
        <Flex sx={sx.collectionInfo}>
          <SourceId labelSx={sx.label} valueSx={sx.values} />
          <PartiallyDigitized
            defaultChecked={collection.partiallyDigitized}
            labelSx={sx.label}
            valueSx={sx.values}
            disabled={false}
            itemId={collection.id}
            updateItemFunction={updateItemFunction}
          />
        </Flex>
        <Flex sx={sx.buttons}>
          <Button>Re-Sync Metadata</Button>
          <Button>Build Manifest</Button>
        </Flex>
      </Flex>
      <Divider />
      <Flex sx={sx.itemSection}>
        <ItemDetails collection={collection} updateItemFunction={updateItemFunction} />
        <ImageGroups groups={[]} />
      </Flex>
    </div>
  )
}

Content.propTypes = {
  updateItemFunction: PropTypes.func.isRequired,
}
export default Content
