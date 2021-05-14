import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'theme-ui'
import DefaultImageModal from './DefaultImageModal'

const DefaultImageButton = ({ itemId, selectedImageUrl, objectFileGroupId, itemTitle, updateItemFunction }) => {
  const [modalOpen, setModalOpen] = useState(false)
  const label = selectedImageUrl ? 'Change Default Image' : 'Set Default Image'
  const callBackOnClick = (selected) => {
    setModalOpen(false)
    if (selected) {
      updateItemFunction({ itemId: itemId, generalDefaultFilePath: selected.id, generalObjectFileGroupId: selected.objectFileGroupId })
    }
  }

  return (
    <>
      <Button onClick={() => setModalOpen(true)}>
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

DefaultImageButton.propTypes = {
  itemId: PropTypes.string.isRequired,
  selectedImageUrl: PropTypes.string,
  itemTitle: PropTypes.string.isRequired,
  objectFileGroupId: PropTypes.string,
  updateItemFunction: PropTypes.func.isRequired,
}

export default DefaultImageButton
