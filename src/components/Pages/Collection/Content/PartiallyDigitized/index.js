import React from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Checkbox,
  Label,
} from 'theme-ui'

const PartiallyDigitized = ({ labelSx, valueSx }) => {
  return (
    <div>
      <Label sx={labelSx}>
        Partially Digitized:
        <Box sx={{ ...valueSx, verticalAlign: 'bottom' }}>
          <Checkbox defaultChecked={false} />
        </Box>
      </Label>
    </div>
  )
}

PartiallyDigitized.propTypes = {
  labelSx: PropTypes.object,
  valueSx: PropTypes.object,
}

export default PartiallyDigitized
