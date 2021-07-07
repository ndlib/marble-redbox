import React, { useState, useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Label,
  Radio,
} from 'theme-ui'
import { useDirectoriesContext } from 'context/DirectoriesContext'
import { useImageGroupContext } from 'context/ImageGroupContext'
import SearchFilter from 'components/Shared/SearchFilter'
import DefaultImage from '../DefaultImage'
import { compareStrings } from 'utils/general'
import Select from 'react-select'

import sx from './sx'

// eslint-disable-next-line complexity
const ImageSelection = ({ selected, onSelect, imageGroupId, showUsedGroups }) => {
  const { imageDirectories, imageDirectoriesReferenced } = useDirectoriesContext()
  const { imageGroup, setImageGroup } = useImageGroupContext()

  // search and sort all the options for the top select box.
  const baseSearchOptions = []
  Object.keys(imageDirectories).forEach((directory) => {
    baseSearchOptions.push({ value: directory, label: directory })
  })
  baseSearchOptions.sort((a, b) => compareStrings(a.value, b.value))

  // if we are editing an existing imageGroupId parse it and preset values
  let defaultBaseSearch = 'none'
  if (imageGroupId) {
    const split = imageGroupId.split('-')
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
  const [selectedSecondSearch, setSelectedSecondSearch] = useState(imageGroupId ? { value: imageGroupId, label: imageGroupId } : null)
  // all options within the selected image group BEFORE applying search filter
  const [imageOptions, setImageOptions] = useState([])
  // filtered options are the individual files to display AFTER applying search filter
  const [filteredOptions, setFilteredOptions] = useState()
  const searchFields = ['id', 'filePath', 'imageGroupId']

  // eslint-disable-next-line complexity
  const secondSearchOptions = useMemo(() => {
    const result = []
    if (imageDirectories && selectedBaseSearch) {
      for (const [key] of Object.entries(imageDirectories[selectedBaseSearch.value])) {
        // Don't include image groups that have already been used unless it is the one used by this item,
        // or if the prop showUsedGroups is set to true
        if (key === imageGroupId || showUsedGroups || !imageDirectoriesReferenced.includes(key)) {
          result.push({ value: key, label: key })
        }
      }
    }
    return result
  }, [imageDirectories, selectedBaseSearch, imageGroupId, imageDirectoriesReferenced, showUsedGroups])

  const onImageSetSelected = (selectedOption) => {
    setSelectedBaseSearch(selectedOption)
    setImageGroup(selectedOption?.value)
    setSelectedSecondSearch(null)
    setImageOptions([])
  }

  useEffect(() => {
    if (!imageDirectories || !selectedBaseSearch) {
      return
    }

    if (selectedSecondSearch) {
      imageDirectories[selectedBaseSearch.value][selectedSecondSearch.value].images.sort((a, b) => {
        if (a.sortId < b.sortId) {
          return -1
        }
        if (a.sortId > b.sortId) {
          return 1
        }
        return 0
      })

      setImageOptions(imageDirectories[selectedBaseSearch.value][selectedSecondSearch.value].images)
    }
  }, [imageDirectories, secondSearchOptions, selectedBaseSearch, setSelectedBaseSearch, selectedSecondSearch])

  useEffect(() => {
    setFilteredOptions(imageOptions)
    // If the newly selected image group doesn't contain the selected option, deselect
    const hasSelected = selected && imageOptions.some(opt => opt.id === selected.id)
    if (!selectedSecondSearch || (!hasSelected && imageOptions.length > 0)) {
      onSelect(null)
    }
  }, [selectedSecondSearch, imageOptions, selected, onSelect])

  return (
    <Box>
      <h3>Hierarchical Image Set</h3>
      <Select
        className='basic-single'
        classNamePrefix='select'
        defaultValue={selectedBaseSearch}
        isClearable
        isSearchable
        onChange={onImageSetSelected}
        name='baseSearchOptions'
        options={baseSearchOptions}
      />

      <h3>Image Group</h3>
      <Select
        className='basic-single'
        classNamePrefix='select'
        value={selectedSecondSearch}
        isClearable
        isSearchable
        onChange={setSelectedSecondSearch}
        name='secondSearchOption'
        options={secondSearchOptions}
      />
      {(filteredOptions) ? (
        <div>
          <h3><Label htmlFor='imageModalSelect'>Select Default Image</Label></h3>
          <SearchFilter id='imageSearch' data={imageOptions} fields={searchFields} onChange={setFilteredOptions} />
          <Box>
            {filteredOptions.map((opt) => {
              const imagePath = `${opt.mediaServer}/${opt.mediaResourceId}`
              const optionThumbnailPath = `${imagePath}/full/250,/0/default.jpg`
              return (
                <Label key={opt.id} sx={sx.option}>
                  <Radio
                    name='imageModalSelect'
                    id='imageModalSelect'
                    value={opt}
                    defaultChecked={opt.id === selected?.id}
                    onChange={() => onSelect(opt)}
                  />
                  <DefaultImage
                    imageUrl={optionThumbnailPath}
                    imageGroupId={opt.imageGroupId}
                    filePath={opt.mediaResourceId}
                  />
                </Label>
              )
            })}
          </Box>
        </div>
      ) : (null)}
    </Box>
  )
}

ImageSelection.propTypes = {
  selected: PropTypes.shape({
    id: PropTypes.string,
  }),
  onSelect: PropTypes.func,
  imageGroupId: PropTypes.string,
  showUsedGroups: PropTypes.bool,
}

export default ImageSelection
