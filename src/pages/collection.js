import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import { Router } from '@reach/router'
import APIContext, { initialContext } from 'context/APIContext'
import PrivateRoute from 'components/Layout/PrivateRoute'
import Layout from 'components/Layout'
import AllCollections from 'components/Pages/AllCollections'
import Collection from 'components/Pages/Collection'

const CollectionPages = ({ location }) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          apis {
            collectionsURL
            directoriesURL
          }
        }
      }
    }
  `)
  const { apis } = data.site.siteMetadata
  const setAPIs = (apis) => {
    setContext({
      ...context,
      collectionsURL: apis.collectionsURL,
      directoriesURL: apis.directoriesURL,
    })
  }

  const [context, setContext] = useState({
    ...initialContext,
    collectionsURL: apis.collectionsURL,
    directoriesURL: apis.directoriesURL,
    setAPIs: setAPIs,
  })

  return (
    <Layout>
      <APIContext.Provider value={context}>
        <Router basepath='/collection'>
          <PrivateRoute path='/' component={AllCollections} location={location} />
          <PrivateRoute path='/:id' component={Collection} location={location} />
        </Router>
      </APIContext.Provider>
    </Layout>
  )
}

CollectionPages.propTypes = {
  location: PropTypes.object.isRequired,
}
export default CollectionPages
