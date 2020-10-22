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

const Content = ({ updateItemFunction }) => {
  const [directoryModalOpen, setDirectoryModalOpen] = useState(false)
  const { collection } = useCollectionContext()
  const { updateDirectories } = useDirectoriesContext()
  const imageGroups = [] // directories.map(directory => directory.groups).flat()
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
            disabled
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
        <ImageGroups groups={imageGroups} />
      </Flex>
    </div>
  )
}

export default Content
