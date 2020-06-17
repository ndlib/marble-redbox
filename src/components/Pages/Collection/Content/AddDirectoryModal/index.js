import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Input,
  Label,
  Radio,
  Text,
} from 'theme-ui'
import { useCollectionContext } from 'context/CollectionContext'
import { useDirectoriesContext } from 'context/DirectoriesContext'
import ActionModal from 'components/Layout/ActionModal'
import ActionButtons from 'components/Layout/ActionModal/ActionButtons'
import { pluralize } from 'utils/general'
import sx from './sx'

const AddDirectoryModal = ({ onSave, onClose }) => {
  const { directories } = useDirectoriesContext()
  const { collection } = useCollectionContext()
  const [selected, setSelected] = useState()

  return (
    <ActionModal
      isOpen
      contentLabel={`Add Default Directory to ${collection.title}`}
      closeFunc={onClose}
    >
      <Label htmlFor='addDirectoryModalSearch' mt={1}>
        Search:
      </Label>
      <Input name='addDirectoryModalSearch' id='addDirectoryModalSearch' autoComplete='off' />
      <Label htmlFor='addDirectoryModalSelect' mt={3}>
        Select Directory
      </Label>
      {directories.map((opt) => (
        <Label key={opt.id} sx={sx.option}>
          <Radio
            name='addDirectorySelect'
            id='addDirectorySelect'
            value={opt.id}
            onChange={() => setSelected(opt)}
          />
          <Text>{opt.path} ({opt.numberOfFiles} {pluralize(opt.numberOfFiles, 'File')})</Text>
        </Label>
      ))}
      <ActionButtons>
        <Button onClick={() => onSave(selected)}>Save</Button>
      </ActionButtons>
    </ActionModal>
  )
}

AddDirectoryModal.propTypes = {
  onSave: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default AddDirectoryModal
