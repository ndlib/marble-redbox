import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'theme-ui'
import DefaultImageModal from '../../DefaultImageModal'

export const fetchStatus = {
  FETCHING: 'FETCHING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
}

const UpdateButton = ({ itemId, selectedImageUrl, objectFileGroupId, itemTitle, updateItemFunction }) => {
  const [modalOpen, setModalOpen] = useState(false)
  const label = selectedImageUrl ? 'Change Default Image' : 'Set Default Image'

  const buttonEnabled = true

  const callBackOnClick = (selected) => {
    setModalOpen(false)
    updateItemFunction({ itemId: itemId, generalDefaultFilePath: selected.id, generalObjectFileGroupId: selected.objectFileGroupId })
  }

  return (
    <>
      <Button
        onClick={() => setModalOpen(true)}
        disabled={!buttonEnabled}
        title={!buttonEnabled ? 'Please select a directory from the righthand side first.' : ''}
      >
        {label}
      </Button>
      {modalOpen && (
        <DefaultImageModal
          defaultSelected={selectedImageUrl}
          objectFileGroupId={objectFileGroupId}
          headerText={`${label} for ${itemTitle}`}
          onClose={() => setModalOpen(false)}
          onSave={(newValue) => callBackOnClick(newValue)}
        />
      )}
    </>
  )
}

UpdateButton.propTypes = {
  itemId: PropTypes.string.isRequired,
  selectedImageUrl: PropTypes.string,
  itemTitle: PropTypes.string,
  updateItemFunction: PropTypes.func.isRequired,
}

export default UpdateButton
