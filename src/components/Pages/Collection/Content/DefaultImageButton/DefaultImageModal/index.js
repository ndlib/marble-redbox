import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
} from 'theme-ui'
import ActionModal from 'components/Layout/ActionModal'
import ActionButtons from 'components/Layout/ActionModal/ActionButtons'
import ImageSelection from '../../ImageSelection'

const DefaultImageModal = ({ defaultSelected, headerText, imageGroupId, onSave, onClose }) => {
  const [selected, setSelected] = useState(defaultSelected)
  console.log('selected', selected)
  return (
    <ActionModal
      isOpen
      contentLabel={headerText}
      closeFunc={onClose}
      fullscreen
    >
      <ImageSelection
        selected={selected}
        onSelect={setSelected}
        imageGroupId={imageGroupId}
      />
      <ActionButtons>
        <Button
          onClick={() => onSave(selected)}
          disabled={!selected || selected.id === defaultSelected?.id}
        >
          Save
        </Button>
      </ActionButtons>
    </ActionModal>
  )
}

DefaultImageModal.propTypes = {
  defaultSelected: PropTypes.shape({
    id: PropTypes.string,
  }),
  headerText: PropTypes.string,
  imageGroupId: PropTypes.string,
  onSave: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
}

DefaultImageModal.defaultProps = {
  headerText: 'Set Default Image',
}

export default DefaultImageModal
