import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Divider,
  Flex,
  Heading,
  Label,
  Input,
} from 'theme-ui'
import ActionModal from 'components/Layout/ActionModal'
import SourceId from './SourceId'
import PartiallyDigitized from './PartiallyDigitized'
import Directories from './Directories'
import DefaultImageModal from './DefaultImageModal'
import ItemDetails from './ItemDetails'
import ImageGroups from './ImageGroups'
import { dummyDirectories } from './dummyData'
import sx from './sx'

const Content = ({ collection }) => {
  const [directories, setDirectories] = useState(dummyDirectories)
  const [directoryModalOpen, setDirectoryModalOpen] = useState(false)

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
          <Button onClick={() => setDirectoryModalOpen(true)}>Add Directory</Button>
          {directoryModalOpen && (
            <DefaultImageModal
              headerText={`Add Default Directory to ${collection.title}`}
              onClose={() => setDirectoryModalOpen(false)}
              onSave={(newValue) => setDirectories(directories.concat(newValue))}
            />
          )}
          <ActionModal
            isOpen={directoryModalOpen}
            contentLabel={`Add Default Image to ${collection.title}`}
            closeFunc={() => setDirectoryModalOpen(false)}
          >
            <Label htmlFor='directorySearch' mt={1}>
              Search:
            </Label>
            <Input name='directorySearch' id='directorySearch' autoComplete='off' />
            <Label htmlFor='imageSelect' mt={1}>
              Select Default Image
            </Label>
            <Button mt={3} onClick={() => setDirectoryModalOpen(false)}>
              Save
            </Button>
          </ActionModal>
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
