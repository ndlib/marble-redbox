/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import PropTypes from 'prop-types'
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

const ImageGroups = ({ directories }) => {
  const [selectedType, setSelectedType] = useState('image')

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
            onClick={() => setSelectedType('image')}
          >
            Images
          </Button>
          <Button
            variant='link'
            sx={selectedType === 'pdf' ? sx.typeButtonSelected : sx.typeButton}
            onClick={() => setSelectedType('pdf')}
          >
            PDFs
          </Button>
        </Flex>
        <Box>
          {typy(groupData[selectedType]).safeArray.map(group => (
            <Text key={group.folderPath} sx={sx.itemText}>
              {group.folderPath} ({group.itemCount} {pluralize(group.itemCount, selectedType)})
            </Text>
          ))}
        </Box>
      </section>
    </BaseStyles>
  )
}

ImageGroups.propTypes = {
  directories: PropTypes.arrayOf(PropTypes.shape({
    path: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(PropTypes.shape({
      path: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
    })),
    folders: PropTypes.arrayOf(PropTypes.shape({
      path: PropTypes.string.isRequired,
      items: PropTypes.arrayOf(PropTypes.shape({
        path: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
      })),
      folders: PropTypes.array, // Assume this is recursive
    })),
  })),
}

export default ImageGroups
