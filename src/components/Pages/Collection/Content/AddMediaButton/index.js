import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'theme-ui'
import AddMediaModal from './AddMediaModal'

const AddMediaButton = ({ itemId, mediaGroupId, selectedImage, imageGroupId, itemTitle, updateItemFunction }) => {
  const [modalOpen, setModalOpen] = useState(false)

  const callBackOnClick = (selected) => {
    setModalOpen(false)
    // updateItemFunction({ itemId: itemId, generalDefaultFilePath: selected.id, generalMediaGroupId: selected.mediaGroupId })
  }

  return (
    <>
      <Button onClick={() => setModalOpen(true)}>
        Add Media
      </Button>
      {modalOpen && (
        <AddMediaModal
          headerText={`Add media to ${itemTitle}`}
          mediaGroupId={mediaGroupId}
          imageGroupId={imageGroupId}
          defaultImage={selectedImage}
          onClose={() => setModalOpen(false)}
          onSave={(newValue) => callBackOnClick(newValue)}
        />
      )}
    </>
  )
}

AddMediaButton.propTypes = {
  itemId: PropTypes.string.isRequired,
  selectedImage: PropTypes.shape({
    id: PropTypes.string,
  }),
  imageGroupId: PropTypes.string,
  itemTitle: PropTypes.string,
  mediaGroupId: PropTypes.string,
  updateItemFunction: PropTypes.func.isRequired,
}

export default AddMediaButton
