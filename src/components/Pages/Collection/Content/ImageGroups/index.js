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
import SearchFilter from 'components/Shared/SearchFilter'
import sx from './sx'

const ImageGroups = ({ groups }) => {
  const groupData = {
    image: groups,
    pdf: [],
  }

  const [selectedType, setSelectedType] = useState('image')
  const [filteredData, setFilteredData] = useState(typy(groupData[selectedType]).safeArray)
  const { imageGroup, setImageGroup } = useImageGroupContext()
  const setType = (type) => {
    setSelectedType(type)
    setImageGroup(null)
    setFilteredData(typy(groupData[type]).safeArray)
  }
  const groupSearchFields = ['Label', 'id', 'directoryId']

  return (
    <BaseStyles sx={sx.container}>
      <section>
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
          <Box mb={3}>
            <SearchFilter
              key={selectedType} // Force new component when selected type changes so search input is reset
              data={typy(groupData[selectedType]).safeArray}
              fields={groupSearchFields}
              onChange={setFilteredData}
            />
          </Box>
          {filteredData.map(group => (
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