/** @jsx jsx */
import React from 'react'
import PropTypes from 'prop-types'
import typy from 'typy'
import {
  Input,
  Label,
  jsx,
} from 'theme-ui'

const searchFields = ['id', 'url', 'title']

const SearchFilter = ({ collections, onChange }) => {
  const filter = (event) => {
    const inputValue = typy(event, 'target.value').safeString.toLowerCase()
    const filteredList = collections.filter((col) => {
      return searchFields.some((field) => typy(col[field]).safeString.toLowerCase().includes(inputValue))
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
  collections: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onChange: PropTypes.func.isRequired,
}

export default SearchFilter
