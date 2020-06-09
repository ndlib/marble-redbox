import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import { Router } from '@reach/router'
import APIContext, { initialContext as initialApiContext } from 'context/APIContext'
import CollectionContext, { initialContext as initialCollectionContext } from 'context/CollectionContext'
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
    setApiContext({
      ...apiContext,
      collectionsURL: apis.collectionsURL,
      directoriesURL: apis.directoriesURL,
    })
  }
  const [apiContext, setApiContext] = useState({
    ...initialApiContext,
    collectionsURL: apis.collectionsURL,
    directoriesURL: apis.directoriesURL,
    setAPIs: setAPIs,
  })

  const setImageGroup = (imageGroup) => {
    setCollectionContext({
      ...collectionContext,
      imageGroup: imageGroup,
    })
  }
  const [collectionContext, setCollectionContext] = useState({
    ...initialCollectionContext,
    setImageGroup: setImageGroup,
  })

  return (
    <Layout>
      <APIContext.Provider value={apiContext}>
        <CollectionContext.Provider value={collectionContext}>
          <Router basepath='/collection'>
            <PrivateRoute path='/' component={AllCollections} location={location} />
            <PrivateRoute path='/:id' component={Collection} location={location} />
          </Router>
        </CollectionContext.Provider>
      </APIContext.Provider>
    </Layout>
  )
}

CollectionPages.propTypes = {
  location: PropTypes.object.isRequired,
}
export default CollectionPages
