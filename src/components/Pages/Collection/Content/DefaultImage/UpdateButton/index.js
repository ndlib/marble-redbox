import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'theme-ui'
import { useImageGroupContext } from 'context/ImageGroupContext'
import DefaultImageModal from '../../DefaultImageModal'

const UpdateButton = ({ selectedImageUrl, itemTitle }) => {
  const [modalOpen, setModalOpen] = useState(false)
  const label = selectedImageUrl ? 'Change Default Image' : 'Set Default Image'
  const { imageGroup } = useImageGroupContext()
  const buttonEnabled = selectedImageUrl || imageGroup

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
          onSave={(newValue) => setModalOpen(false)}
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
