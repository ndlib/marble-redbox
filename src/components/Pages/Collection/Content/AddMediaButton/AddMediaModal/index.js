import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Heading,
  Checkbox,
  Container,
  Label,
  Divider,
} from 'theme-ui'

import Select from 'react-select'
import { useDirectoriesContext } from 'context/DirectoriesContext'
// import { useMediaGroupContext } from 'context/MediaGroupContext'
import ActionModal from 'components/Layout/ActionModal'
import { compareStrings } from 'utils/general'

import sx from './sx'

const AddMediaModal = ({ headerText, onSave, onClose }) => {
  const { directories } = useDirectoriesContext()
  // const { mediaGroup, setMediaGroup } = useMediaGroupContext()
  const [overrideEnabled, setOverrideEnabled] = useState(false)

  const handleDirectorySelect = (selection) => {
    // TODO: Do stuff
    console.log('selected value:', selection)
    // setSelectedBaseSearch(selectedOptions)
    // setImageGroup(selectedOptions?.value)
    // setSecondBaseSearch(null)
  }

  const handleMediaGroupSelect = (selection) => {
    // TODO: Do stuff
    console.log('selected value:', selection)
  }

  const baseSearchOptions = []
  Object.keys(directories).forEach((directory) => {
    baseSearchOptions.push({ value: directory, label: directory })
  })
  baseSearchOptions.sort((a, b) => compareStrings(a.value, b.value))

  const mediaGroupOptions = [
    { value: 'test', label: 'Test' },
    { value: 'foo', label: 'Foo' },
  ]

  return (
    <ActionModal contentLabel={headerText} closeFunc={onClose} fullscreen isOpen>
      <Box as='form' onSubmit={onSave}>
        <Container sx={sx.formGroup}>
          <Heading as='h3'>Hierarchical Group</Heading>
          <Select
            name='hierarchicalGroupOptions'
            className='basic-single'
            classNamePrefix='select'
            // defaultValue={selectedBaseSearch}
            isClearable
            isSearchable
            onChange={handleDirectorySelect}
            options={baseSearchOptions}
          />
        </Container>
        <Container sx={sx.formGroup}>
          <Heading as='h3'>Media Group</Heading>
          <Select
            name='mediaGroupOptions'
            className='basic-single'
            classNamePrefix='select'
            isClearable
            isSearchable
            options={mediaGroupOptions}
            onChange={handleMediaGroupSelect}
          />
        </Container>
        <Container sx={sx.formGroup}>
          <Label>
            <Heading as='h3'>Override Default Image</Heading><br />
            <Checkbox
              checked={overrideEnabled}
              onChange={() => setOverrideEnabled(!overrideEnabled)}
              sx={sx.checkbox}
            />
          </Label>
        </Container>
        {overrideEnabled && (
          <>
            <Divider sx={sx.divider} />
            <Container sx={sx.formGroup}>
              <Heading as='h3'>Hierarchical Image Group</Heading>
              <Select
                name='imageHierarchicalOptions'
                className='basic-single'
                classNamePrefix='select'
                // defaultValue={selectedBaseSearch}
                isClearable
                isSearchable
                onChange={handleDirectorySelect}
                options={baseSearchOptions}
              />
            </Container>
          </>
        )}
      </Box>
    </ActionModal>
  )
}

AddMediaModal.propTypes = {
  headerText: PropTypes.string,
  onSave: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
}
AddMediaModal.defaultProps = {
  headerText: 'Add Media',
}

export default AddMediaModal
