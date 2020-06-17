import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Flex,
  IconButton,
  Text,
} from 'theme-ui'
import { MdModeEdit } from 'react-icons/md'
import { useCollectionContext } from 'context/CollectionContext'
import Modal from './Modal'

const SourceId = ({ labelSx, valueSx }) => {
  const { collection } = useCollectionContext()
  const [modalOpen, setModalOpen] = useState(false)
  const [sourceId, setSourceId] = useState(collection.id)
  return (
    <div>
      <Text sx={labelSx}>Source ID:</Text>
      <Box sx={valueSx}>
        <Flex>
          {sourceId}
          <IconButton
            ml={2}
            aria-label='Edit'
            onClick={() => setModalOpen(true)}
          >
            <MdModeEdit />
          </IconButton>
        </Flex>
      </Box>
      {modalOpen && (
        <Modal
          sourceId={sourceId}
          onClose={() => setModalOpen(false)}
          onSave={(newValue) => {
            setSourceId(newValue)
            setModalOpen(false)
          }}
        />
      )}
    </div>
  )
}

SourceId.propTypes = {
  labelSx: PropTypes.object,
  valueSx: PropTypes.object,
}

export default SourceId
