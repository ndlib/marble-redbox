/** @jsx jsx */
import React from 'react'
import PropTypes from 'prop-types'
import typy from 'typy'
import {
  Input,
  Label,
  jsx,
} from 'theme-ui'

const SearchFilter = ({ data, fields, onChange }) => {
  const filter = (event) => {
    const inputValue = typy(event, 'target.value').safeString.toLowerCase()
    const filteredList = data.filter((item) => {
      return fields.some((field) => typy(item[field]).safeString.toLowerCase().includes(inputValue))
    })
    onChange(filteredList)
  }
  return (
    <React.Fragment>
      <Label htmlFor='search'>Search</Label>
      <Input
        name='search'
        id='search'
        autoComplete='off'
        onChange={filter}
      />
    </React.Fragment>
  )
}

SearchFilter.propTypes = {
  data: PropTypes.array.isRequired,
  fields: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default SearchFilter
