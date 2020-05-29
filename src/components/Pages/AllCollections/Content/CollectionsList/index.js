/** @jsx jsx */
import { jsx, BaseStyles } from 'theme-ui'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

const CollectionList = ({ collections }) => {
  if (collections.length === 0) {
    return <div>There are no matching collections.</div>
  }
  return (
    <BaseStyles>
      <ul>
        {
          collections.map(collection => {
            return (
              <li key={collection.id}>
                <Link to={`/collection/${collection.id}`}>{collection.title}</Link>
              </li>
            )
          })
        }
      </ul>
    </BaseStyles>
  )
}

CollectionList.propTypes = {
  collections: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }),
  ).isRequired,
}
export default CollectionList
