/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

const Header = ({ siteTitle }) => (
  <header
    sx={{
      backgroundColor: 'primary',
      color: 'background',
    }}
  >
    <div
      sx={{
        margin: '0 auto',
        maxWidth: ['100vw', '100vw', '64em'],
        padding: '1.45rem 1.0875rem',
      }}
    >
      <Styled.h1 sx={{
        color: 'background',
        margin: 0,
      }}
      >
        <Link
          to='/collection'
          sx={{
            color: 'background',
            textDecoration: 'none',
          }}
        >
          {siteTitle}
        </Link>
      </Styled.h1>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: '',
}

export default Header
