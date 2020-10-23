/** @jsx jsx */
import {
  jsx,
  BaseStyles,
  Text,
} from 'theme-ui'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import sx from './sx'

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
                <Link to={`/collection/${collection.id}`}>
                  {collection.title} - {collection.id}
                  {collection.sourceSystemUri && (
                    <Text sx={sx.sourceUrl}>&nbsp;({collection.sourceSystemUri})</Text>
                  )}
                  {collection.partiallyDigitized && (
                    <Text sx={sx.tag}>Partially Digitized</Text>
                  )}
                </Link>
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
      title: PropTypes.string.isRequired,
    }),
  ).isRequired,
}
export default CollectionList
