import React from 'react'
import PropTypes from 'prop-types'
import {
  Divider,
  Flex,
  Heading,
  Label,
  Checkbox,
  Textarea,
  Box,
} from 'theme-ui'
import { useCollectionContext } from 'context/CollectionContext'
import SourceId from './SourceId'
import PartiallyDigitized from './PartiallyDigitized'
import ItemDetails from './ItemDetails'
import sx from './sx'

const Content = ({ updateItemFunction }) => {
  const { collection } = useCollectionContext()
  return (
    <div>
      <Flex sx={sx.headingRow}>
        <Heading as='h1' sx={sx.heading}>{collection.title}</Heading>
      </Flex>
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
            Images Restricted:
            <Box sx={{ ...sx.values, verticalAlign: 'bottom', cursor: 'default' }}>
              <Checkbox />
            </Box>
          </Label>
          <Label sx={sx.label}>
            Copyright Details
            <Textarea />
          </Label>
        </Flex>
      </Flex>
      <Divider />
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
