import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Label,
  Radio,
  Text,
} from 'theme-ui'
import { useCollectionContext } from 'context/CollectionContext'
import { useDirectoriesContext } from 'context/DirectoriesContext'
import ActionModal from 'components/Layout/ActionModal'
import ActionButtons from 'components/Layout/ActionModal/ActionButtons'
import SearchFilter from 'components/Shared/SearchFilter'
import { pluralize } from 'utils/general'
import sx from './sx'

const Content = ({ directories, onSave, onClose }) => {
  const { collection } = useCollectionContext()
  const [selected, setSelected] = useState()
  const [filtered, setFiltered] = useState(directories)
  const searchFields = ['path']

  return (
    <ActionModal
      isOpen
      contentLabel={`Add Default Directory to ${collection.title}`}
      closeFunc={onClose}
    >
      <SearchFilter data={directories} fields={searchFields} onChange={setFiltered} />
      <Label htmlFor='addDirectorySelect' mt={3}>
        Select Directory
      </Label>
      {filtered.map((opt) => (
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

Content.propTypes = {
  directories: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    numberOfFiles: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
  })).isRequired,
  onSave: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default Content
