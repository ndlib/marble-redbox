import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import { Router } from '@reach/router'
import APIContext, { initialContext as initialApiContext } from 'context/APIContext'
import CollectionContext, { initialContext as initialCollectionContext } from 'context/CollectionContext'
import DirectoriesContext, { initialContext as initialDirectoriesContext } from 'context/DirectoriesContext'
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

  const setCollection = (collection) => {
    setCollectionContext({
      ...collectionContext,
      collection: collection,
    })
  }
  const setImageGroup = (collection, imageGroup) => {
    // TODO: Figure out why I can't set imageGroup without also setting collection...
    setCollectionContext({
      ...collectionContext,
      collection: collection,
      imageGroup: imageGroup,
    })
  }
  const [collectionContext, setCollectionContext] = useState({
    ...initialCollectionContext,
    setCollection: setCollection,
    setImageGroup: setImageGroup,
  })

  const setDirectories = (directories) => {
    setDirectoriesContext({
      ...directoriesContext,
      directories: directories,
    })
  }
  const [directoriesContext, setDirectoriesContext] = useState({
    ...initialDirectoriesContext,
    setDirectories: setDirectories,
  })

  return (
    <Layout>
      <APIContext.Provider value={apiContext}>
        <CollectionContext.Provider value={collectionContext}>
          <DirectoriesContext.Provider value={directoriesContext}>
            <Router basepath='/collection'>
              <PrivateRoute path='/' component={AllCollections} location={location} />
              <PrivateRoute path='/:id' component={Collection} location={location} />
            </Router>
          </DirectoriesContext.Provider>
        </CollectionContext.Provider>
      </APIContext.Provider>
    </Layout>
  )
}

CollectionPages.propTypes = {
  location: PropTypes.object.isRequired,
}
export default CollectionPages
