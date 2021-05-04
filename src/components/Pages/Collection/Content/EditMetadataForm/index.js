import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Flex,
  Label,
  Checkbox,
  Textarea,
  Box,
  Button,
} from 'theme-ui'
import PartiallyDigitized from '../PartiallyDigitized'
import { MdExpandLess, MdExpandMore } from 'react-icons/md'
import sx from './sx'

const EditMetadataForm = ({ updateItemFunction, item, startExpanded = false }) => {
  const [expanded, setExpanded] = useState(startExpanded)
  return (
    <div>
      <Box onClick={() => setExpanded(!expanded)} sx={sx.showEditButton}>
        {expanded ? (<Button><MdExpandLess sx={sx.expandIcon} /> Hide Edit</Button>) : (<Button><MdExpandMore sx={sx.expandIcon} /> Show Edit</Button>)}
      </Box>
      <Box sx={{ display: expanded ? 'block' : 'none' }}>
        <Flex sx={sx.topControls}>
          <Flex sx={sx.collectionInfo}>
            <PartiallyDigitized
              defaultChecked={item.partiallyDigitized}
              labelSx={sx.label}
              valueSx={sx.values}
              disabled={false}
              itemId={item.id}
              updateItemFunction={updateItemFunction}
            />
            <Label sx={sx.label}>
              Restricted:
              <Box sx={{ ...sx.values, verticalAlign: 'bottom', cursor: 'default' }}>
                <Checkbox />
              </Box>
            </Label>
            <Label sx={sx.label}>
              RightsStatement.org Statement:
              <div>
                <select>
                  <option>Select...</option>
                  <option>IN COPYRIGHT</option>
                  <option>IN COPYRIGHT - EU ORPHAN WORK</option>
                  <option>IN COPYRIGHT - EDUCATIONAL USE PERMITTED</option>
                  <option>IN COPYRIGHT - NON-COMMERCIAL USE PERMITTED</option>
                  <option>IN COPYRIGHT - RIGHTS-HOLDER(S) UNLOCATABLE OR UNIDENTIFIABLE</option>
                  <option>NO COPYRIGHT - CONTRACTUAL RESTRICTIONS</option>
                  <option>NO COPYRIGHT - NON-COMMERCIAL USE ONLY</option>
                  <option>NO COPYRIGHT - OTHER KNOWN LEGAL RESTRICTIONS</option>
                  <option>NO COPYRIGHT - UNITED STATES</option>
                  <option>NO COPYRIGHT - PUBLIC DOMAIN</option>
                  <option>COPYRIGHT NOT EVALUATED</option>
                  <option>COPYRIGHT UNDETERMINED</option>
                  <option>NO KNOWN COPYRIGHT</option>
                </select>
              </div>
            </Label>
            <Label sx={sx.label}>
              Copyright Status
              <Textarea value={item.copyrightStatus} />
            </Label>
            <Label sx={sx.label}>
              Use Permissions
              <Textarea value={item.copyrightStatement} />
            </Label>
            <Label sx={sx.label}>
              Additional Details
              <Textarea />
            </Label>
          </Flex>
        </Flex>
      </Box>
    </div>
  )
}

EditMetadataForm.propTypes = {
  updateItemFunction: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  startExpanded: PropTypes.bool,
}
export default EditMetadataForm
