import React from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Input,
  Label,
} from 'theme-ui'

const Search = ({ onFilter, sx }) => {
  return (
    <Box sx={sx}>
      <Label htmlFor='search'>Search</Label>
      <Input
        name='search'
        id='search'
        autoComplete='off'
        onChange={onFilter}
      />
    </Box>
  )
}

Search.propTypes = {
  onFilter: PropTypes.func.isRequired,
  sx: PropTypes.any,
}

export default Search
