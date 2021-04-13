import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Divider,
  Flex,
  Heading,
  Label,
  Checkbox,
  Textarea,
  Box,
  Button,
} from 'theme-ui'
import { useCollectionContext } from 'context/CollectionContext'
import SourceId from './SourceId'
import PartiallyDigitized from './PartiallyDigitized'
import ItemDetails from './ItemDetails'
import { MdExpandLess, MdExpandMore } from 'react-icons/md'
import sx from './sx'

const Content = ({ updateItemFunction }) => {
  const { collection } = useCollectionContext()
  const [expanded, setExpanded] = useState(false)
  return (
    <div>
      <Flex sx={sx.headingRow}>
        <Heading as='h1' sx={sx.heading}>{collection.title}</Heading>
      </Flex>
      <Box onClick={() => setExpanded(!expanded)} sx={sx.showEditButton}>
        {expanded ? (<Button><MdExpandLess sx={sx.expandIcon} /> Hide Edit</Button>) : (<Button><MdExpandMore sx={sx.expandIcon} /> Show Edit</Button>)}
      </Box>
      <Box sx={{ display: expanded ? 'block' : 'none' }}>
        <Flex sx={sx.topControls}>
          <Flex sx={sx.collectionInfo}>
            <SourceId labelSx={sx.label} valueSx={sx.values} />

            <PartiallyDigitized
              defaultChecked={collection.partiallyDigitized}
              labelSx={sx.label}
              valueSx={sx.values}
              disabled={false}
              itemId={collection.id}
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
                </select>
              </div>
            </Label>
            <Label sx={sx.label}>
            Copyright Status
              <Textarea value={collection.copyrightStatus} />
            </Label>
            <Label sx={sx.label}>
            Copyright Statement
              <Textarea value={collection.copyrightStatement} />
            </Label>
            <Label sx={sx.label}>
              Additional Details
              <Textarea />
            </Label>
          </Flex>
        </Flex>
        <Divider />

      </Box>
      <Flex sx={sx.itemSection}>
        <ItemDetails collection={collection} updateItemFunction={updateItemFunction} />
      </Flex>
    </div>
  )
}

Content.propTypes = {
  updateItemFunction: PropTypes.func.isRequired,
}
export default Content
