/** @jsx jsx */
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import typy from 'typy'
import {
  Input,
  Label,
  jsx,
} from 'theme-ui'

const SearchFilter = ({ id, data, fields, onChange }) => {
  const [searchText, setSearchText] = useState('')

  // Filter whenever underlying data or the search text is changed
  useEffect(() => {
    // Split search terms on spaces for a quick-and-dirty multiterm search
    const inputTerms = searchText.toLowerCase().split(' ')
    const filteredList = data.filter((item) => {
      // EVERY term must be included in the search fields. They can be in different fields.
      return inputTerms.every(term => {
        return fields.some((field) => typy(item[field]).safeString.toLowerCase().includes(term))
      })
    })
    onChange(filteredList)
  }, [data, searchText]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleChangeEvent = (event) => {
    const value = typy(event, 'target.value').safeString
    setSearchText(value)
  }

  return (
    <React.Fragment>
      <Label htmlFor='search'>Search</Label>
      <Input
        name='search'
        id={id}
        autoComplete='off'
        value={searchText}
        onChange={handleChangeEvent}
      />
    </React.Fragment>
  )
}

SearchFilter.propTypes = {
  id: PropTypes.string,
  data: PropTypes.array.isRequired,
  fields: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default SearchFilter
