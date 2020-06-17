import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Input,
  Label,
} from 'theme-ui'
import ActionModal from 'components/Layout/ActionModal'
import ActionButtons from 'components/Layout/ActionModal/ActionButtons'

const Modal = ({ sourceId, onSave, onClose }) => {
  const [newSourceId, setNewSourceId] = useState(sourceId)

  return (
    <ActionModal
      isOpen
      contentLabel='Edit Source System ID'
      closeFunc={onClose}
    >
      <Label htmlFor='sourceIdInput' mt={1}>
        Source System ID:
      </Label>
      <Input
        name='sourceIdInput'
        id='sourceIdInput'
        autoComplete='off'
        onChange={(event) => setNewSourceId(event.target.value)}
        value={newSourceId}
      />
      <ActionButtons>
        <Button onClick={() => onSave(newSourceId)}>Save</Button>
      </ActionButtons>
    </ActionModal>
  )
}

Modal.propTypes = {
  sourceId: PropTypes.string,
  onSave: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default Modal
