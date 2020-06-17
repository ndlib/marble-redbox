/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import typy from 'typy'
import {
  jsx,
  BaseStyles,
  Box,
  Button,
  Flex,
  Text,
} from 'theme-ui'
import { pluralize } from 'utils/general'
import { useCollectionContext } from 'context/CollectionContext'
import { useDirectoriesContext } from 'context/DirectoriesContext'
import { dummyDirectories } from '../dummyData'
import sx from './sx'

const getItemGroupsOfType = (folder, type, groups = []) => {
  const items = typy(folder.items).safeArray.filter(item => item.type === type)
  if (items.length) {
    groups.push({
      folderPath: folder.path,
      itemCount: items.length,
    })
  }
  typy(folder.folders).safeArray.forEach(folder => getItemGroupsOfType(folder, type, groups))
  return groups
}

const ImageGroups = () => {
  // const { directories } = useDirectoriesContext()
  const directories = dummyDirectories
  const [selectedType, setSelectedType] = useState('image')
  const { imageGroup, setImageGroup, collection } = useCollectionContext()
  const setGroup = (group) => {
    setImageGroup(collection, group)
  }
  const setType = (type) => {
    setSelectedType(type)
    setGroup(null)
  }

  const groupData = {
    image: [].concat(...directories.map(directory => getItemGroupsOfType(directory, 'image'))),
    pdf: [].concat(...directories.map(directory => getItemGroupsOfType(directory, 'pdf'))),
  }

  return (
    <BaseStyles>
      <section sx={sx.container}>
        <Flex sx={sx.typeSelect}>
          <Button
            variant='link'
            sx={selectedType === 'image' ? sx.typeButtonSelected : sx.typeButton}
            onClick={() => setType('image')}
          >
            Images
          </Button>
          <Button
            variant='link'
            sx={selectedType === 'pdf' ? sx.typeButtonSelected : sx.typeButton}
            onClick={() => setType('pdf')}
          >
            PDFs
          </Button>
        </Flex>
        <Box>
          {typy(groupData[selectedType]).safeArray.map(group => (
            <Box
              key={group.folderPath}
              onClick={() => setGroup(group)}
              sx={sx.itemGroup}
            >
              <Text
                sx={{
                  ...sx.itemText,
                  ...(group.folderPath === typy(imageGroup, 'folderPath').safeString ? sx.selected : {}),
                }}
              >
                {group.folderPath} ({group.itemCount} {pluralize(group.itemCount, selectedType)})
              </Text>
            </Box>
          ))}
          {imageGroup && (
            <Button
              variant='link'
              onClick={() => setGroup(null)}
            >
              Clear Selection
            </Button>
          )}
        </Box>
      </section>
    </BaseStyles>
  )
}

export default ImageGroups
