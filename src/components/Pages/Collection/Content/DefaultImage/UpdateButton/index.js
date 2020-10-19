import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'theme-ui'
import { useImageGroupContext } from 'context/ImageGroupContext'
import DefaultImageModal from '../../DefaultImageModal'

const UpdateButton = ({ collectionId, itemId, selectedImageUrl, itemTitle }) => {
  const [modalOpen, setModalOpen] = useState(false)
  const label = selectedImageUrl ? 'Change Default Image' : 'Set Default Image'
  const { imageGroup } = useImageGroupContext()
  const buttonEnabled = selectedImageUrl || imageGroup

  const callBackOnClick = (selected) => {
    const abortController = new AbortController()

    setModalOpen(false)
    const query = `mutation {
      updateGeneralSettings(input: {
        collectionId: "${collectionId}",
        generalDefaultImageId: "${selected.id}",
        generalObjectFileGroupId: "${selected.fileId}",
        id: "${itemId}"
      }) {
        id
      }
    }
    `

    fetch(
      "https://u6j4kl5davbdvhhnf4miuugf2a.appsync-api.us-east-1.amazonaws.com/graphql",
      {
        headers: {
          'x-api-key': 'da2-wh6ulmemfraztlcibgz6zzlckm',
          'Content-Type': 'application/json',
        },
        method: 'POST',
        signal: abortController.signal,
        mode: 'cors',
        body: JSON.stringify({ query: query })

      })
      .then(result => {
        return result.json()
      })
      .then((data) => {
        console.log("done", data)
      })
      .catch((error) => {
        console.log("error", error)
      })

    return false
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
