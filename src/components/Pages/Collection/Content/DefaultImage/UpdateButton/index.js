import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'theme-ui'
import { useImageGroupContext } from 'context/ImageGroupContext'
import {
  useCollectionContext,
  fetchAndParseCollection,
} from 'context/CollectionContext'
import DefaultImageModal from '../../DefaultImageModal'

export const fetchStatus = {
  FETCHING: 'FETCHING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
}

const UpdateButton = ({ collectionId, itemId, selectedImageUrl, itemTitle, updateItemFunction }) => {
  const [modalOpen, setModalOpen] = useState(false)
  const label = selectedImageUrl ? 'Change Default Image' : 'Set Default Image'
  const { imageGroup } = useImageGroupContext()

  const buttonEnabled = selectedImageUrl || imageGroup

  const callBackOnClick = (selected) => {
    setModalOpen(false)
    //(itemId, generalDefaultImageId, generalObjectFileGroupId)
    updateItemFunction(itemId, selected.id, selected.fileId)
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
          headerText={`${label} for ${itemTitle}`}
          onClose={() => setModalOpen(false)}
          onSave={(newValue) => callBackOnClick(newValue)}
        />
      )}
    </>
  )
}

UpdateButton.propTypes = {
  selectedImageUrl: PropTypes.string,
  itemTitle: PropTypes.string,
}

export default UpdateButton
