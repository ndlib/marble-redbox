import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import typy from 'typy'
import {
  Box,
  Button,
  Label,
  Radio,
  Text,
} from 'theme-ui'
import { useDirectoriesContext } from 'context/DirectoriesContext'
import { useImageGroupContext } from 'context/ImageGroupContext'
import ActionModal from 'components/Layout/ActionModal'
import ActionButtons from 'components/Layout/ActionModal/ActionButtons'
import SearchFilter from 'components/Shared/SearchFilter'
import DefaultImage from '../DefaultImage'
import Select from 'react-select'

import sx from './sx'

const DefaultImageModal = ({ defaultSelected, headerText, objectFileGroupId, onSave, onClose }) => {
  const { directories } = useDirectoriesContext()
  const { imageGroup, setImageGroup } = useImageGroupContext()

  // search and sort all the options for the top select box.
  const baseSearchOptions = []
  Object.keys(directories).forEach((directory) => {
    baseSearchOptions.push({ value: directory, label: directory })
  })
  baseSearchOptions.sort((a, b) => {
    a = a.value.toUpperCase()
    b = b.value.toUpperCase()
    if (a < b) {
      return -1
    }
    if (a > b) {
      return 1
    }
    return 0
  })

  // if we are editing an existing objectFileGroupId parse it and preset values
  let defaultBaseSearch = 'none'
  if (objectFileGroupId) {
    const split = objectFileGroupId.split('-')
    if (split[0]) {
      defaultBaseSearch = split[0]
    }
  } else if (imageGroup) {
    // recall the value from the last usage of the form. if there is one.
    defaultBaseSearch = imageGroup
  }

  // filtered options are the individual files in the page
  const [filteredOptions, setFilteredOptions] = useState([])
  // search base is the values for the top search box
  const [selectedBaseSearch, setSelectedBaseSearch] = useState(baseSearchOptions.find(directory => directory.value === defaultBaseSearch))
  // second search are the values for the second search box
  const [selectedSecondSearch, setSecondBaseSearch] = useState({ key: objectFileGroupId, value: objectFileGroupId })
  // the option selected from the radio of the files
  const [selected, setSelected] = useState(null)
  const searchFields = ['Label', 'Key', 'Description']

  // the optionse for the second search box useeffect because they change
  const secondSearchOptions = []
  useEffect(() => {
    if (!directories) {
      return
    }
    // get all the options from the directory and sort
    for (const [key, directory] of Object.entries(directories[selectedBaseSearch.value])) {
      secondSearchOptions.push({ value: key, label: key })
    }
    secondSearchOptions.sort((a, b) => {
      // sort by removeing the first part of the string then trying to sort as an integer
      a = parseInt(a.label.replace(selectedBaseSearch.value, '').replace('-', ''))
      b = parseInt(b.label.replace(selectedBaseSearch.value, '').replace('-', ''))
      return a - b
    })
  }, [directories, secondSearchOptions, selectedBaseSearch, setSelectedBaseSearch])

  return (
    <ActionModal
      isOpen
      contentLabel={headerText}
      closeFunc={onClose}
      fullscreen
    >
      <h3>Hierarchical Image Set</h3>
      <Select
        className='basic-single'
        classNamePrefix='select'
        defaultValue={selectedBaseSearch}
        isDisabled={false}
        isLoading={false}
        isClearable
        isRtl={false}
        isSearchable
        onChange={selectedOptions => {
          setSelectedBaseSearch(selectedOptions)
          setImageGroup(selectedOptions.value)
          setSecondBaseSearch(null)
        }}
        name='baseSearchOptions'
        options={baseSearchOptions}
      />

      <h3>Image Group</h3>
      <Select
        className='basic-single'
        classNamePrefix='select'
        defaultValue={selectedSecondSearch}
        isDisabled={false}
        isLoading={false}
        isClearable
        isRtl={false}
        isSearchable
        onChange={selectedOptions => {
          setSecondBaseSearch(selectedOptions)
          directories[selectedBaseSearch.value][selectedOptions.value].files.sort((a, b) => {
            if (a.sortId < b.sortId) {
              return -1
            }
            if (a.sortId > b.sortId) {
              return 1
            }
            return 0
          })
          setFilteredOptions(directories[selectedBaseSearch.value][selectedOptions.value].files)
        }}
        name='secondSearchOption'
        options={secondSearchOptions}
      />
      {(filteredOptions) ? (
        <div>
          <h3><Label htmlFor='imageModalSelect'>Select Default Image</Label></h3>
          <SearchFilter id='searchFiels' data={filteredOptions} fields={searchFields} onChange={setFilteredOptions} />
          <Box sx={sx.optionsContainer}>
            {filteredOptions.map((opt) => (
              <Label key={opt.id} sx={sx.option}>
                <Radio
                  name='imageModalSelect'
                  id='imageModalSelect'
                  value={opt.iiifImageUri}
                  defaultChecked={defaultSelected === opt.iiifImageUri}
                  onChange={() => setSelected(opt)}
                />
                <DefaultImage imageUrl={opt.id} inModal />
              </Label>
            ))}
          </Box>
          <ActionButtons>
            <Button onClick={() => onSave(selected)}>Save</Button>
          </ActionButtons>
        </div>
      ) : (null) }
    </ActionModal>
  )
}

DefaultImageModal.propTypes = {
  defaultSelected: PropTypes.string,
  headerText: PropTypes.string,
  objectFileGroupId: PropTypes.string,
  onSave: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
}

DefaultImageModal.defaultProps = {
  headerText: 'Set Default Image',
}

export default DefaultImageModal
