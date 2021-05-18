import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'theme-ui'
import AddMediaModal from './AddMediaModal'

const AddMediaButton = ({ itemId, selectedImageUrl, objectFileGroupId, itemTitle, updateItemFunction }) => {
  const [modalOpen, setModalOpen] = useState(false)

  const callBackOnClick = (selected) => {
    setModalOpen(false)
    // updateItemFunction({ itemId: itemId, generalDefaultFilePath: selected.id, generalObjectFileGroupId: selected.objectFileGroupId })
  }

  return (
    <>
      <Button onClick={() => setModalOpen(true)}>
        Add Media
      </Button>
      {modalOpen && (
        <AddMediaModal
          headerText={`Add media to ${itemTitle}`}
          onClose={() => setModalOpen(false)}
          onSave={(newValue) => callBackOnClick(newValue)}
        />
      )}
    </>
  )
}

AddMediaButton.propTypes = {
  itemId: PropTypes.string.isRequired,
  selectedImageUrl: PropTypes.string,
  itemTitle: PropTypes.string,
  objectFileGroupId: PropTypes.string,
  updateItemFunction: PropTypes.func.isRequired,
}

export default AddMediaButton
