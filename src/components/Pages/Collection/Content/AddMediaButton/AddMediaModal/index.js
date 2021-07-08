import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Heading,
  Checkbox,
  Container,
  Label,
  Divider,
} from 'theme-ui'

import ActionModal from 'components/Layout/ActionModal'
import ActionButtons from 'components/Layout/ActionModal/ActionButtons'
import ImageSelection from '../../ImageSelection'
import MediaSelection from '../../MediaSelection'

import sx from './sx'

const AddMediaModal = ({ headerText, mediaGroupId, imageGroupId, defaultImage, onSave, onClose }) => {
  const [selectedMedia, setSelectedMedia] = useState()
  const [overrideEnabled, setOverrideEnabled] = useState(false)
  const [selectedImage, setSelectedImage] = useState(defaultImage)

  const toggleImageOverride = () => {
    const willBeEnabled = !overrideEnabled
    setOverrideEnabled(willBeEnabled)
    // If it was turned off, reset the image override
    if (!willBeEnabled) {
      setSelectedImage(defaultImage)
    }
  }

  return (
    <ActionModal contentLabel={headerText} closeFunc={onClose} fullscreen isOpen>
      <MediaSelection
        selected={selectedMedia}
        onSelect={setSelectedMedia}
        mediaGroupId={mediaGroupId}
      />
      <Container sx={sx.formGroup}>
        <Label>
          <Heading as='h3'>Override Default Image</Heading><br />
          <Checkbox
            checked={overrideEnabled}
            onChange={toggleImageOverride}
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
      <ActionButtons>
        <Button
          onClick={() => onSave(selectedMedia, overrideEnabled ? selectedImage : null)}
          disabled={!selectedMedia || (overrideEnabled && !selectedImage)}
        >
          Save
        </Button>
      </ActionButtons>
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
