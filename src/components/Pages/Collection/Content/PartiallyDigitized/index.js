import React from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Checkbox,
  Label,
} from 'theme-ui'

const PartiallyDigitized = ({ itemId, defaultChecked, disabled, labelSx, valueSx, updateItemFunction }) => {
  const callBackOnClick = (selected) => {
    updateItemFunction({ itemId: itemId, generalPartiallyDigitized: selected.target.checked })
  }

  return (
    <div>
      <Label sx={labelSx}>
        Partially Digitized:
        <Box sx={{ ...valueSx, verticalAlign: 'bottom', cursor: (disabled ? 'not-allowed' : 'default') }}>
          <Checkbox
            defaultChecked={defaultChecked}
            disabled={disabled}
            onChange={callBackOnClick}
          />
        </Box>
      </Label>
    </div>
  )
}

PartiallyDigitized.propTypes = {
  itemId: PropTypes.string.isRequired,
  defaultChecked: PropTypes.bool,
  disabled: PropTypes.bool,
  labelSx: PropTypes.object,
  valueSx: PropTypes.object,
  updateItemFunction: PropTypes.func.isRequired,
}

export default PartiallyDigitized
