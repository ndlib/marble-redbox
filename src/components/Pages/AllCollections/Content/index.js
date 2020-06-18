import React, { useState } from 'react'
import PropTypes from 'prop-types'
import AddNew from './AddNew'
import SearchFilter from './SearchFilter'
import CollectionsList from './CollectionsList'

const Content = ({ collections }) => {
  const [filtered, setFiltered] = useState(collections)
  return (
    <div>
      <AddNew />
      <SearchFilter collections={collections} onChange={setFiltered} />
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
}
export default Content
