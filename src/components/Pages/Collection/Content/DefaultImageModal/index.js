import React, { useState } from 'react'
import PropTypes from 'prop-types'
import typy from 'typy'
import {
  Box,
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
import DefaultImage from '../DefaultImage'
import sx from './sx'

const DefaultImageModal = ({ defaultSelected, headerText, onSave, onClose }) => {
  const { directories } = useDirectoriesContext()
  let { imageGroup } = useCollectionContext()
  if (!imageGroup) {
    // Find the group that contains the current default image.
    directories.forEach((directory) => {
      // Check each group if it contains the image
      const groupMatch = typy(directory, 'groups').safeArray.find((group) => {
        return typy(group, 'files').safeArray.some((file) => file.iiifImageUri === defaultSelected)
      })
      // If it did, use that group
      if (groupMatch) {
        imageGroup = groupMatch
      }
    })
  }
  const defaultOption = imageGroup.files.find((opt) => opt.value === defaultSelected)
  const [selected, setSelected] = useState(defaultOption)
  const [filteredOptions, setFilteredOptions] = useState(imageGroup.files)
  const searchFields = ['Label', 'Key', 'Description']

  return (
    <ActionModal
      isOpen
      contentLabel={headerText}
      closeFunc={onClose}
    >
      <Text mb={3}>
        Selected Group: {imageGroup.Label}
      </Text>
      <SearchFilter data={imageGroup.files} fields={searchFields} onChange={setFilteredOptions} />
      <Label htmlFor='imageModalSelect' mt={3}>
        Select Default Image
      </Label>
      <Box sx={sx.optionsContainer}>
        {filteredOptions.map((opt) => (
          <Label key={opt.Key} sx={sx.option}>
            <Radio
              name='imageModalSelect'
              id='imageModalSelect'
              value={opt.iiifImageUri}
              defaultChecked={defaultSelected === opt.iiifImageUri}
              onChange={() => setSelected(opt)}
            />
            <DefaultImage imageUrl={opt.iiifImageUri} inModal />
          </Label>
        ))}
      </Box>
      <ActionButtons>
        <Button onClick={() => onSave(selected)}>Save</Button>
      </ActionButtons>
    </ActionModal>
  )
}

DefaultImageModal.propTypes = {
  defaultSelected: PropTypes.string,
  headerText: PropTypes.string,
  onSave: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
}

DefaultImageModal.defaultProps = {
  headerText: 'Set Default Image',
}

export default DefaultImageModal
