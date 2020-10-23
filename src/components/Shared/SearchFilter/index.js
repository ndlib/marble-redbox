/** @jsx jsx */
import React from 'react'
import PropTypes from 'prop-types'
import typy from 'typy'
import {
  Input,
  Label,
  jsx,
} from 'theme-ui'

const SearchFilter = ({ id, data, fields, onChange }) => {
  const filter = (event) => {
    // Split search terms on spaces for a quick-and-dirty multiterm search
    const inputTerms = typy(event, 'target.value').safeString.toLowerCase().split(' ')
    const filteredList = data.filter((item) => {
      // EVERY term must be included in the search fields. They can be in different fields.
      return inputTerms.every(term => {
        return fields.some((field) => typy(item[field]).safeString.toLowerCase().includes(term))
      })
    })
    onChange(filteredList)
  }
  return (
    <React.Fragment>
      <Label htmlFor='search'>Search</Label>
      <Input
        name='search'
        id={id}
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
