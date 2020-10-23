import React, { useState } from 'react'
import PropTypes from 'prop-types'
import AddNew from './AddNew'
import SearchFilter from 'components/Shared/SearchFilter'
import CollectionsList from './CollectionsList'

const Content = ({ collections }) => {
  const [filtered, setFiltered] = useState(collections)
  const searchFields = ['id', 'title'] // 'url', , 'sourceSystemUri'
  return (
    <div>
      <AddNew />
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
}
export default Content
