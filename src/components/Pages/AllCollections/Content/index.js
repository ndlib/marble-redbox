import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Box } from 'theme-ui'
import SearchFilter from 'components/Shared/SearchFilter'
import CollectionsList from './CollectionsList'
import ImportCollection from './ImportCollection'

const Content = ({ collections, importCollectionFunction, importCollectionStatus }) => {
  const [filtered, setFiltered] = useState(collections)
  const searchFields = ['id', 'title'] // 'url', , 'sourceSystemUri'
  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <ImportCollection onSubmit={importCollectionFunction} status={importCollectionStatus} />
      </Box>
      <SearchFilter data={collections} fields={searchFields} onChange={setFiltered} />
      <CollectionsList collections={filtered} />
    </div>
  )
}

Content.propTypes = {
  collections: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }),
  ).isRequired,
  importCollectionFunction: PropTypes.func.isRequired,
  importCollectionStatus: PropTypes.string,
}
export default Content
