/** @jsx jsx */
import React from 'react'
import {
  Input,
  Label,
  jsx,
} from 'theme-ui'
const SearchFilter = () => {
  return (
    <React.Fragment>
      <Label htmlFor='search'>Search</Label>
      <Input
        name='search'
        id='search'
        autoComplete='off'
      />
    </React.Fragment>
  )
}

export default SearchFilter
