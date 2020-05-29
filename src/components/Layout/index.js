/** @jsx jsx */
import React from 'react'
import { jsx, BaseStyles } from 'theme-ui'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'

import Header from './Header'

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <React.Fragment>
      <Header siteTitle={data.site.siteMetadata.title} />
      <BaseStyles>
        <div
          sx={{
            margin: '0 auto',
            maxWidth: ['100vw', '100vw', '64em'],
            padding: '1.45rem 1.0875rem',
          }}
        >
          <main>{children}</main>
        </div>
      </BaseStyles>
    </React.Fragment>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
