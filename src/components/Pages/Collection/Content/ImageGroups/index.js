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
import { useImageGroupContext } from 'context/ImageGroupContext'
import sx from './sx'

const ImageGroups = ({ groups }) => {
  const [selectedType, setSelectedType] = useState('image')
  const { imageGroup, setImageGroup } = useImageGroupContext()
  const setType = (type) => {
    setSelectedType(type)
    setImageGroup(null)
  }

  const groupData = {
    image: groups,
    pdf: [],
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
              key={group.id}
              onClick={() => setImageGroup(group)}
              sx={sx.itemGroup}
            >
              <Text
                sx={{
                  ...sx.itemText,
                  ...(group.id === typy(imageGroup, 'id').safeString ? sx.selected : {}),
                }}
              >
                {group.Label} ({group.files.length} {pluralize(group.files.length, selectedType)})
              </Text>
            </Box>
          ))}
          {imageGroup && (
            <Button
              variant='link'
              onClick={() => setImageGroup(null)}
            >
              Clear Selection
            </Button>
          )}
        </Box>
      </section>
    </BaseStyles>
  )
}

ImageGroups.propTypes = {
  groups: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    Label: PropTypes.string.isRequired,
    files: PropTypes.array.isRequired,
  })).isRequired,
}

export default ImageGroups
