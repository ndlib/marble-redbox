import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'theme-ui'
import AddMediaModal from './AddMediaModal'

const AddMediaButton = ({ itemId, mediaGroupId, selectedImage, imageGroupId, itemTitle, updateItemFunction }) => {
  const [modalOpen, setModalOpen] = useState(false)

  const callBackOnClick = (selectedMedia) => {
    setModalOpen(false)
    updateItemFunction({ itemId: itemId, generalMediaGroupId: selectedMedia.id })
  }

  return (
    <>
      <Button onClick={() => setModalOpen(true)}>
        Set Media Group
      </Button>
      {modalOpen && (
        <AddMediaModal
          headerText={`Set media group for ${itemTitle}`}
          mediaGroupId={mediaGroupId}
          imageGroupId={imageGroupId}
          defaultImage={selectedImage}
          onClose={() => setModalOpen(false)}
          onSave={callBackOnClick}
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
