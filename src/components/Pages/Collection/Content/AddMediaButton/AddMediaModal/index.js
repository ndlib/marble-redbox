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
import { useMediaGroupContext } from 'context/MediaGroupContext'
import ActionModal from 'components/Layout/ActionModal'
import ImageSelection from '../../ImageSelection'
import { compareStrings } from 'utils/general'

import sx from './sx'

/* eslint-disable complexity */
const AddMediaModal = ({ headerText, mediaGroupId, imageGroupId, defaultImage, onSave, onClose }) => {
  const { mediaDirectories } = useDirectoriesContext()
  const { mediaGroup, setMediaGroup } = useMediaGroupContext()

  const mediaGroupOptions = []
  Object.keys(mediaDirectories).forEach((directory) => {
    mediaGroupOptions.push({ value: directory, label: directory })
  })
  mediaGroupOptions.sort((a, b) => compareStrings(a.value, b.value))

  const [overrideEnabled, setOverrideEnabled] = useState(false)
  const [selectedImage, setSelectedImage] = useState(defaultImage)

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
            <ImageSelection
              selected={selectedImage}
              onSelect={setSelectedImage}
              imageGroupId={imageGroupId}
              showUsedGroups
            />
          </>
        )}
      </Box>
    </ActionModal>
  )
}

AddMediaModal.propTypes = {
  headerText: PropTypes.string,
  imageGroupId: PropTypes.string,
  defaultImage: PropTypes.shape({
    id: PropTypes.string,
  }),
  mediaGroupId: PropTypes.string,
  onSave: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
}
AddMediaModal.defaultProps = {
  headerText: 'Add Media',
}

export default AddMediaModal
