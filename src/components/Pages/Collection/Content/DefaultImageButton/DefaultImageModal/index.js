import React, { useState, useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Button,
  Label,
  Radio,
} from 'theme-ui'
import { useDirectoriesContext } from 'context/DirectoriesContext'
import { useImageGroupContext } from 'context/ImageGroupContext'
import ActionModal from 'components/Layout/ActionModal'
import ActionButtons from 'components/Layout/ActionModal/ActionButtons'
import SearchFilter from 'components/Shared/SearchFilter'
import DefaultImage from '../../DefaultImage'
import Select from 'react-select'

import sx from './sx'

// eslint-disable-next-line complexity
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

  // search base is the values for the top search box
  const [selectedBaseSearch, setSelectedBaseSearch] = useState(baseSearchOptions.find(directory => directory.value === defaultBaseSearch))
  // second search are the values for the second search box
  const [selectedSecondSearch, setSecondBaseSearch] = useState(objectFileGroupId ? { value: objectFileGroupId, label: objectFileGroupId } : null)
  // all options within the selected image group BEFORE applying search filter
  const [imageOptions, setImageOptions] = useState([])
  // filtered options are the individual files to display AFTER applying search filter
  const [filteredOptions, setFilteredOptions] = useState()
  // the option selected from the radio of the files
  const [selected, setSelected] = useState(null)
  const searchFields = ['id', 'filePath', 'objectFileGroupId']

  const secondSearchOptions = useMemo(() => {
    const result = []
    if (directories && selectedBaseSearch) {
      for (const [key] of Object.entries(directories[selectedBaseSearch.value])) {
        result.push({ value: key, label: key })
      }
    }
    return result
  }, [directories, selectedBaseSearch])

  useEffect(() => {
    if (!directories || !selectedBaseSearch) {
      return
    }

    if (selectedSecondSearch) {
      directories[selectedBaseSearch.value][selectedSecondSearch.value].files.sort((a, b) => {
        if (a.sortId < b.sortId) {
          return -1
        }
        if (a.sortId > b.sortId) {
          return 1
        }
        return 0
      })

      setImageOptions(directories[selectedBaseSearch.value][selectedSecondSearch.value].files)
    }
  }, [directories, secondSearchOptions, selectedBaseSearch, setSelectedBaseSearch, selectedSecondSearch])

  useEffect(() => {
    setFilteredOptions(imageOptions)
    // If the newly selected image group doesn't contain the selected option, deselect
    const hasSelected = selected && imageOptions.some(opt => opt.id === selected.id)
    if (!hasSelected) {
      setSelected(null)
    }
  }, [imageOptions, selected])

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
          setImageGroup(selectedOptions?.value)
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
        onChange={setSecondBaseSearch}
        name='secondSearchOption'
        options={secondSearchOptions}
      />
      {(filteredOptions) ? (
        <div>
          <h3><Label htmlFor='imageModalSelect'>Select Default Image</Label></h3>
          <SearchFilter id='imageSearch' data={imageOptions} fields={searchFields} onChange={setFilteredOptions} />
          <Box sx={sx.optionsContainer}>
            {filteredOptions.map((opt) => {
              const imagePath = `${opt.mediaServer}/${opt.mediaResourceId}`
              const optionThumbnailPath = `${imagePath}/full/250,/0/default.jpg`
              const selectedThumbnailPath = selected
                ? `${selected.mediaServer}/${selected.mediaResourceId}/full/250,/0/default.jpg`
                : defaultSelected
              return (
                <Label key={opt.id} sx={sx.option}>
                  <Radio
                    name='imageModalSelect'
                    id='imageModalSelect'
                    value={opt}
                    defaultChecked={selectedThumbnailPath === optionThumbnailPath}
                    onChange={() => setSelected(opt)}
                  />
                  <DefaultImage
                    imageUrl={optionThumbnailPath}
                    objectFileGroupId={opt.objectFileGroupId}
                    filePath={opt.mediaResourceId}
                  />
                </Label>
              )
            })}
          </Box>
          <ActionButtons>
            <Button onClick={() => onSave(selected)} disabled={!selected}>Save</Button>
          </ActionButtons>
        </div>
      ) : (null)}
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
