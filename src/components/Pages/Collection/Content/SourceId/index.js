import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Flex,
  IconButton,
  Link,
  Text,
} from 'theme-ui'
import { MdModeEdit } from 'react-icons/md'
import { useCollectionContext } from 'context/CollectionContext'
import Modal from './Modal'
import sx from './sx'

const SourceId = ({ labelSx, valueSx }) => {
  const { collection } = useCollectionContext()
  const [modalOpen, setModalOpen] = useState(false)
  const [sourceUri, setSourceUri] = useState(collection.sourceSystemUri)
  return (
    <div>
      <Text sx={labelSx}>Source ID:</Text>
      <Box sx={valueSx}>
        <Flex>
          {collection.id}
          {sourceUri && (
            <Text ml={2}>
              (
              <Link href={sourceUri} target='_blank' sx={sx.sourceUrl}>{sourceUri}</Link>
              )
            </Text>
          )}
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
          onClose={() => setModalOpen(false)}
          onSave={(newValue) => {
            setSourceUri(newValue)
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
