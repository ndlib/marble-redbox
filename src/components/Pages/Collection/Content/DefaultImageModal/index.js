import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Label,
  Radio,
  Text,
} from 'theme-ui'
import { useCollectionContext } from 'context/CollectionContext'
import ActionModal from 'components/Layout/ActionModal'
import ActionButtons from 'components/Layout/ActionModal/ActionButtons'
import SearchFilter from 'components/Shared/SearchFilter'
import DefaultImage from '../DefaultImage'
import { dummyImageOptions } from '../dummyData'
import sx from './sx'

const DefaultImageModal = ({ defaultSelected, headerText, onSave, onClose }) => {
  const options = dummyImageOptions
  const defaultOption = options.find((opt) => opt.value === defaultSelected)
  const [selected, setSelected] = useState(defaultOption)
  const [filteredOptions, setFilteredOptions] = useState(options)
  let { imageGroup } = useCollectionContext()
  if (!imageGroup && defaultSelected) {
    // TODO: Get group based on currently selected default image
    imageGroup = {
      folderPath: defaultSelected,
    }
  }
  const searchFields = ['label', 'value']

  return (
    <ActionModal
      isOpen
      contentLabel={headerText}
      closeFunc={onClose}
    >
      {imageGroup && (
        <Text mb={3}>
          Selected Group: {imageGroup.folderPath}
        </Text>
      )}
      <SearchFilter data={options} fields={searchFields} onChange={setFilteredOptions} />
      <Label htmlFor='imageModalSelect' mt={3}>
        Select Default Image
      </Label>
      {filteredOptions.map((opt) => (
        <Label key={opt.value} sx={sx.option}>
          <Radio
            name='imageModalSelect'
            id='imageModalSelect'
            value={opt.value}
            defaultChecked={defaultSelected === opt.value}
            onChange={() => setSelected(opt)}
          />
          <DefaultImage imageUrl={opt.value} inModal />
        </Label>
      ))}
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
