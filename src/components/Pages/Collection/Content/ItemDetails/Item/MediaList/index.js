import React from 'react'
import PropTypes from 'prop-types'
import { Box, Container, IconButton } from 'theme-ui'
import { MdRemoveCircle } from 'react-icons/md'

import sx from './sx'

const MediaList = ({ media, removeMediaFunction }) => {
  if (!media || media.length === 0) {
    return null
  }

  return (
    <Container sx={sx.listContainer}>
      <Box as='ul' sx={sx.list}>
        {media.map(record => {
          return (
            <Box as='li' key={record.id} sx={sx.listItem}>
              {decodeURIComponent(record.mediaResourceId)}
            </Box>
          )
        })}
        {removeMediaFunction && (
          <IconButton
            sx={sx.removeIcon}
            aria-label='Remove media group'
            title='Remove media group'
            onClick={removeMediaFunction}
          >
            <MdRemoveCircle />
          </IconButton>
        )}
      </Box>
    </Container>
  )
}

MediaList.propTypes = {
  media: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    mediaServer: PropTypes.string,
    mediaResourceId: PropTypes.string,
  })),
  removeMediaFunction: PropTypes.func,
}

export default MediaList
