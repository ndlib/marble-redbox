import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Flex,
  Label,
  Textarea,
  Box,
  Button,
  Select,
} from 'theme-ui'
import PartiallyDigitized from '../../PartiallyDigitized'
import { copyrightStatements } from 'utils/general'
import sx from './sx'

/* eslint-disable complexity */
const FormFields = ({ item, updateItemFunction, updateCopyrightFunction }) => {
  const defaultCopyrightUrl = item.copyrightUrl || ''
  const defaultUsePermissions = item.copyrightStatement || ''
  const defaultAdditionalNotes = item.additionalNotes || ''
  const [statementUri, setStatementUri] = useState(defaultCopyrightUrl)
  const [usePermissions, setUsePermissions] = useState(defaultUsePermissions)
  const [additionalNotes, setAdditionalNotes] = useState(defaultAdditionalNotes)
  const hasChanged = (
    statementUri !== defaultCopyrightUrl ||
    usePermissions !== defaultUsePermissions ||
    additionalNotes !== defaultAdditionalNotes
  )

  const save = () => {
    updateCopyrightFunction({
      itemId: item.id,
      statementUri,
      usePermissions,
      additionalNotes,
    })
  }

  return (
    <Box>
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
            RightsStatement.org Statement:
            <Select value={statementUri} onChange={(event) => setStatementUri(event.target.value)}>
              <option value=''>Select...</option>
              {copyrightStatements.map(statementInfo => (
                <option key={statementInfo.uri} value={statementInfo.uri}>
                  {statementInfo.name}
                </option>
              ))}
            </Select>
          </Label>
          <Label sx={sx.label}>
            Use Permissions
            <Textarea value={usePermissions} onChange={(event) => setUsePermissions(event.target.value)} />
          </Label>
          <Label sx={sx.label}>
            Additional Details
            <Textarea value={additionalNotes} onChange={(event) => setAdditionalNotes(event.target.value)} />
          </Label>
        </Flex>
      </Flex>
      <Button onClick={save} sx={{ mb: 2 }} disabled={!hasChanged}>Save</Button>
    </Box>
  )
}

FormFields.propTypes = {
  updateItemFunction: PropTypes.func.isRequired,
  updateCopyrightFunction: PropTypes.func,
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    partiallyDigitized: PropTypes.bool,
    copyrightUrl: PropTypes.string,
    copyrightStatement: PropTypes.string,
    additionalNotes: PropTypes.string,
  }).isRequired,
}
export default FormFields
