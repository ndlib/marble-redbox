import React, { useState } from 'react'
import {
  Button,
  Divider,
  Flex,
  Heading,
  Label,
  Input,
} from 'theme-ui'
import { useCollectionContext } from 'context/CollectionContext'
import { useDirectoriesContext } from 'context/DirectoriesContext'
import ActionModal from 'components/Layout/ActionModal'
import SourceId from './SourceId'
import PartiallyDigitized from './PartiallyDigitized'
import Directories from './Directories'
import AddDirectoryModal from './AddDirectoryModal'
import ItemDetails from './ItemDetails'
import ImageGroups from './ImageGroups'
import sx from './sx'

const Content = () => {
  const [directoryModalOpen, setDirectoryModalOpen] = useState(false)
  const { collection } = useCollectionContext()
  const { directories, updateDirectories } = useDirectoriesContext()

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
          <Directories labelSx={sx.label} valueSx={sx.values} />
        </Flex>
        <Flex sx={sx.buttons}>
          <Button>Re-Sync Metadata</Button>
          <Button>Build Manifest</Button>
          <Button onClick={() => setDirectoryModalOpen(true)}>Add Directory</Button>
          {directoryModalOpen && (
            <AddDirectoryModal
              onClose={() => setDirectoryModalOpen(false)}
              onSave={(newValue) => updateDirectories(directories.concat(newValue))}
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
        <ImageGroups />
      </Flex>
    </div>
  )
}

export default Content
