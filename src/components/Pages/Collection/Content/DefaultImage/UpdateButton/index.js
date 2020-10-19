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

const UpdateButton = ({ collectionId, itemId, selectedImageUrl, itemTitle }) => {
  const [modalOpen, setModalOpen] = useState(false)
  const label = selectedImageUrl ? 'Change Default Image' : 'Set Default Image'
  const { imageGroup } = useImageGroupContext()

  const [collectionStatus, setCollectionStatus] = useState(fetchStatus.FETCHING)
  const { setCollection } = useCollectionContext()
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
    setCollectionStatus(fetchStatus.FETCHING)

    fetch(
      process.env.GRAPHQL_API_URL,
      {
        headers: {
          'x-api-key': process.env.GRAPHQL_API_KEY,
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
        fetchAndParseCollection(data.data.updateGeneralSettings.id, abortController)
          .then((result) => {
            console.log("reset ? ")
            setCollection(result)
            setCollectionStatus(fetchStatus.SUCCESS)
          })
          .catch((error) => {
            console.log("error", error)
            // setErrorMsg(error)
            setCollectionStatus(fetchStatus.ERROR)
          })
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
