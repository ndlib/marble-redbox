import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Heading,
  Checkbox,
  Container,
  Label,
  Divider,
} from 'theme-ui'

import Select from 'react-select'
import { useDirectoriesContext } from 'context/DirectoriesContext'
import { useImageGroupContext } from 'context/ImageGroupContext'
import { useMediaGroupContext } from 'context/MediaGroupContext'
import ActionModal from 'components/Layout/ActionModal'
import { compareStrings } from 'utils/general'

import sx from './sx'

/* eslint-disable complexity */
const AddMediaModal = ({ headerText, imageGroupId, mediaGroupId, onSave, onClose }) => {
  const { imageDirectories, mediaDirectories } = useDirectoriesContext()
  const { mediaGroup, setMediaGroup } = useMediaGroupContext()
  const { imageGroup, setImageGroup } = useImageGroupContext()

  const handleImageBaseSelect = (selection) => {
    // TODO: Do stuff
    console.log('selected value:', selection)
    setSelectedImageBase(selection)
    setImageGroup(selection?.value)
    // setSecondBaseSearch(null)
  }

  const mediaGroupOptions = []
  Object.keys(mediaDirectories).forEach((directory) => {
    mediaGroupOptions.push({ value: directory, label: directory })
  })
  mediaGroupOptions.sort((a, b) => compareStrings(a.value, b.value))

  const baseSearchOptions = []
  Object.keys(imageDirectories).forEach((directory) => {
    baseSearchOptions.push({ value: directory, label: directory })
  })
  baseSearchOptions.sort((a, b) => compareStrings(a.value, b.value))

  // if we are editing an existing imageGroupId parse it and preset values
  let defaultBaseSearch = 'none'
  if (imageGroupId) {
    const split = imageGroupId.split('-')
    if (split[0]) {
      defaultBaseSearch = split[0]
    }
  } else if (imageGroup) {
    // recall the value from the last usage of the form. if there is one.
    defaultBaseSearch = imageGroup
  }

  const [selectedImageBase, setSelectedImageBase] = useState(baseSearchOptions.find(directory => directory.value === defaultBaseSearch))
  const [overrideEnabled, setOverrideEnabled] = useState(false)
  const [selectedImageGroup, setSelectedImageGroup] = useState(imageGroupId ? { value: imageGroupId, label: imageGroupId } : null)
  const [imageGroupOptions, setImageGroupOptions] = useState([])

  return (
    <ActionModal contentLabel={headerText} closeFunc={onClose} fullscreen isOpen>
      <Box as='form' onSubmit={onSave}>
        <Container sx={sx.formGroup}>
          <Heading as='h3'>Media Group</Heading>
          <Select
            name='mediaGroupOptions'
            className='basic-single'
            classNamePrefix='select'
            defaultValue={mediaGroup}
            isClearable
            isSearchable
            options={mediaGroupOptions}
            onChange={setMediaGroup}
          />
        </Container>
        <Container sx={sx.formGroup}>
          <Label>
            <Heading as='h3'>Override Default Image</Heading><br />
            <Checkbox
              checked={overrideEnabled}
              onChange={() => setOverrideEnabled(!overrideEnabled)}
              sx={sx.checkbox}
            />
          </Label>
        </Container>
        {overrideEnabled && (
          <>
            <Divider sx={sx.divider} />
            <Container sx={sx.formGroup}>
              <Heading as='h3'>Hierarchical Image Group</Heading>
              <Select
                name='imageHierarchicalOptions'
                className='basic-single'
                classNamePrefix='select'
                defaultValue={selectedImageBase}
                isClearable
                isSearchable
                onChange={handleImageBaseSelect}
                options={baseSearchOptions}
              />
            </Container>
            <Container sx={sx.formGroup}>
              <Heading as='h3'>Image Group</Heading>
              <Select
                name='imageGroupOptions'
                className='basic-single'
                classNamePrefix='select'
                defaultValue={selectedImageGroup}
                isClearable
                isSearchable
                options={imageGroupOptions}
                onChange={setSelectedImageGroup}
              />
            </Container>
          </>
        )}
      </Box>
    </ActionModal>
  )
}

AddMediaModal.propTypes = {
  headerText: PropTypes.string,
  imageGroupId: PropTypes.string,
  mediaGroupId: PropTypes.string,
  onSave: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
}
AddMediaModal.defaultProps = {
  headerText: 'Add Media',
}

export default AddMediaModal
