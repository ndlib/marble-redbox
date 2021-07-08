import React, { useState, useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Container,
  Heading,
  Label,
  Radio,
} from 'theme-ui'
import { useDirectoriesContext } from 'context/DirectoriesContext'
import { useMediaGroupContext } from 'context/MediaGroupContext'
import SearchFilter from 'components/Shared/SearchFilter'
import { compareStrings } from 'utils/general'
import Select from 'react-select'

import sx from './sx'

// eslint-disable-next-line complexity
const MediaSelection = ({ selected, onSelect, mediaGroupId }) => {
  const { mediaDirectories } = useDirectoriesContext()
  const { mediaGroup, setMediaGroup } = useMediaGroupContext()

  // search and sort all the options for the top select box.
  const baseSearchOptions = []
  Object.keys(mediaDirectories).forEach((directory) => {
    baseSearchOptions.push({ value: directory, label: directory })
  })
  baseSearchOptions.sort((a, b) => compareStrings(a.value, b.value))

  // if we are editing an existing mediaGroupId parse it and preset values
  let defaultBaseSearch = 'none'
  if (mediaGroupId) {
    const split = mediaGroupId.split('-')
    if (split[0]) {
      defaultBaseSearch = split[0]
    }
  } else if (mediaGroup) {
    // recall the value from the last usage of the form. if there is one.
    defaultBaseSearch = mediaGroup
  }

  // search base is the values for the top search box
  const [selectedBaseSearch, setSelectedBaseSearch] = useState(baseSearchOptions.find(directory => directory.value === defaultBaseSearch))
  // second search are the values for the second search box
  const [selectedSecondSearch, setSelectedSecondSearch] = useState(mediaGroupId ? { value: mediaGroupId, label: mediaGroupId } : null)
  // all options within the selected media group BEFORE applying search filter
  const [mediaOptions, setMediaOptions] = useState([])
  // filtered options are the individual files to display AFTER applying search filter
  const [filteredOptions, setFilteredOptions] = useState([])
  const searchFields = ['id', 'filePath', 'mediaGroupId']

  // eslint-disable-next-line complexity
  const secondSearchOptions = useMemo(() => {
    const result = []
    if (mediaDirectories && selectedBaseSearch) {
      for (const [key] of Object.entries(mediaDirectories[selectedBaseSearch.value])) {
        result.push({ value: key, label: key })
      }
    }
    return result
  }, [mediaDirectories, selectedBaseSearch])

  const onMedaSetSelected = (selectedOption) => {
    setSelectedBaseSearch(selectedOption)
    setMediaGroup(selectedOption?.value)
    setSelectedSecondSearch(null)
    setMediaOptions([])
  }

  useEffect(() => {
    if (!mediaDirectories || !selectedBaseSearch) {
      return
    }

    if (selectedSecondSearch) {
      mediaDirectories[selectedBaseSearch.value][selectedSecondSearch.value].media.sort((a, b) => {
        if (a.sortId < b.sortId) {
          return -1
        }
        if (a.sortId > b.sortId) {
          return 1
        }
        return 0
      })

      setMediaOptions(mediaDirectories[selectedBaseSearch.value][selectedSecondSearch.value].media)
    }
  }, [mediaDirectories, secondSearchOptions, selectedBaseSearch, setSelectedBaseSearch, selectedSecondSearch])

  // Clear media options if the media group has been cleared
  useEffect(() => {
    if (!selectedSecondSearch && mediaOptions.length) {
      setMediaOptions([])
    }
  }, [selectedSecondSearch, mediaOptions, setMediaOptions])

  useEffect(() => {
    // If the newly selected media group doesn't contain the selected option, deselect
    const hasSelected = selected && mediaOptions.some(opt => opt.id === selected.id)
    if (!selectedSecondSearch || (!hasSelected && mediaOptions.length > 0)) {
      onSelect(null)
    }
  }, [selectedSecondSearch, mediaOptions, selected, onSelect])

  return (
    <>
      <Container sx={sx.formGroup}>
        <Heading as='h3'>Hierarchical Media Set</Heading>
        <Select
          className='basic-single'
          classNamePrefix='select'
          defaultValue={selectedBaseSearch}
          isClearable
          isSearchable
          onChange={onMedaSetSelected}
          name='baseSearchOptions'
          options={baseSearchOptions}
        />
      </Container>
      <Container sx={sx.formGroup}>
        <Heading as='h3'>Media Group</Heading>
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
      </Container>
      {mediaOptions.length > 0 && (
        <Container sx={sx.formGroup}>
          <Heading as='h3'><Label htmlFor='mediaModalSelect'>Select Media</Label></Heading>
          <SearchFilter id='mediaSearch' data={mediaOptions} fields={searchFields} onChange={setFilteredOptions} />
          <Box>
            {filteredOptions.map((opt) => {
              return (
                <Label key={opt.id} sx={sx.option}>
                  <Radio
                    name='mediaModalSelect'
                    id='mediaModalSelect'
                    value={opt}
                    defaultChecked={opt.id === selected?.id}
                    onChange={() => onSelect(opt)}
                  />
                  {opt.id}
                </Label>
              )
            })}
          </Box>
        </Container>
      )}
    </>
  )
}

MediaSelection.propTypes = {
  selected: PropTypes.shape({
    id: PropTypes.string,
  }),
  onSelect: PropTypes.func,
  mediaGroupId: PropTypes.string,
}

export default MediaSelection
