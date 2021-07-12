import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
} from 'theme-ui'
import { MdExpandLess, MdExpandMore } from 'react-icons/md'
import FormFields from './FormFields'
import sx from './sx'

const EditMetadataForm = ({ updateItemFunction, updateCopyrightFunction, item, startExpanded = false }) => {
  const [expanded, setExpanded] = useState(startExpanded)
  return (
    <div>
      <Button onClick={() => setExpanded(!expanded)} sx={sx.showEditButton}>
        {expanded ? (
          <><MdExpandLess sx={sx.expandIcon} /> Hide Edit</>
        ) : (
          <><MdExpandMore sx={sx.expandIcon} /> Show Edit</>
        )}
      </Button>
      {expanded && (
        <FormFields
          item={item}
          updateItemFunction={updateItemFunction}
          updateCopyrightFunction={updateCopyrightFunction}
        />
      )}
    </div>
  )
}

EditMetadataForm.propTypes = {
  updateItemFunction: PropTypes.func.isRequired,
  updateCopyrightFunction: PropTypes.func,
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    partiallyDigitized: PropTypes.bool,
    copyrightUrl: PropTypes.string,
    copyrightStatement: PropTypes.string,
    additionalNotes: PropTypes.string,
  }).isRequired,
  startExpanded: PropTypes.bool,
}
export default EditMetadataForm
