import React from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Checkbox,
  Label,
} from 'theme-ui'

const PartiallyDigitized = ({ defaultChecked, disabled, onChange, labelSx, valueSx }) => {
  return (
    <div>
      <Label sx={labelSx}>
        Partially Digitized:
        <Box sx={{ ...valueSx, verticalAlign: 'bottom', cursor: (disabled ? 'not-allowed' : 'default') }}>
          <Checkbox
            defaultChecked={defaultChecked}
            disabled={disabled}
            onChange={onChange}
          />
        </Box>
      </Label>
    </div>
  )
}

PartiallyDigitized.propTypes = {
  defaultChecked: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  labelSx: PropTypes.object,
  valueSx: PropTypes.object,
}

export default PartiallyDigitized
