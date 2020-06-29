import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Label,
  Checkbox,
  Text,
} from 'theme-ui'
import { useCollectionContext } from 'context/CollectionContext'
import ActionModal from 'components/Layout/ActionModal'
import ActionButtons from 'components/Layout/ActionModal/ActionButtons'
import SearchFilter from 'components/Shared/SearchFilter'
import { pluralize } from 'utils/general'
import sx from './sx'

const Content = ({ directories, onSave, onClose }) => {
  const { collection } = useCollectionContext()
  const [selected, setSelected] = useState([])
  const [filtered, setFiltered] = useState(directories)
  const searchFields = ['path']

  const toggleOption = (option) => {
    const previouslyChecked = selected.some(item => item === option)
    if (previouslyChecked) {
      setSelected(selected.filter(item => item !== option))
    } else {
      setSelected(selected.concat([option]))
    }
  }

  const searchChanged = (newOptions) => {
    // Deselect any items that are no longer in the filtered list
    setSelected(selected.filter(item => newOptions.includes(item)))
    setFiltered(newOptions)
  }

  const selectAll = () => {
    setSelected(filtered)
  }

  return (
    <ActionModal
      isOpen
      contentLabel={`Add Default Directories to ${collection.title}`}
      closeFunc={onClose}
    >
      <SearchFilter data={directories} fields={searchFields} onChange={searchChanged} />
      <Label htmlFor='addDirectorySelect' mt={3}>
        Select Directories
      </Label>
      {filtered.map((opt) => (
        <Label key={opt.id} sx={sx.option}>
          <Checkbox
            onChange={() => toggleOption(opt)}
            checked={selected.includes(opt)}
          />
          <Text>{opt.path} ({opt.numberOfFiles} {pluralize(opt.numberOfFiles, 'File')})</Text>
        </Label>
      ))}
      <ActionButtons>
        <Button onClick={selectAll}>Select All</Button>
        <Button onClick={() => onSave(selected)} disabled={!selected.length}>Save</Button>
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
