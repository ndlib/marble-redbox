import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import { Router } from '@reach/router'
import APIContext, { initialContext as initialApiContext } from 'context/APIContext'
import CollectionContext, { initialContext as initialCollectionContext } from 'context/CollectionContext'
import DirectoriesContext, { initialContext as initialDirectoriesContext } from 'context/DirectoriesContext'
import ImageGroupContext, { initialContext as initialImageGroupContext } from 'context/ImageGroupContext'
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
            graphqlApiUrl
          }
        }
      }
    }
  `)
  const { apis } = data.site.siteMetadata
  const setAPIs = (apis) => {
    setApiContext({
      ...apiContext,
      graphqlApiUrl: apis.graphqlApiUrl,
    })
  }
  const [apiContext, setApiContext] = useState({
    ...initialApiContext,
    graphqlApiUrl: apis.graphqlApiUrl,
    setAPIs: setAPIs,
  })

  const setCollection = (collection) => {
    setCollectionContext({
      ...collectionContext,
      collection: collection,
    })
  }
  const [collectionContext, setCollectionContext] = useState({
    ...initialCollectionContext,
    setCollection: setCollection,
  })

  const setImageGroup = (imageGroup) => {
    setImageGroupContext({
      ...imageGroupContext,
      imageGroup: imageGroup,
    })
  }
  const [imageGroupContext, setImageGroupContext] = useState({
    ...initialImageGroupContext,
    setImageGroup: setImageGroup,
  })

  const setDirectories = (directories) => {
    setDirectoriesContext({
      ...directoriesContext,
      directories: directories,
    })
  }
  const setLastAccessedDirectory = (lastAccessedDirectory) => {
    setDirectoriesContext({
      ...directoriesContext,
      lastAccessedDirectory: lastAccessedDirectory,
    })
  }
  const [directoriesContext, setDirectoriesContext] = useState({
    ...initialDirectoriesContext,
    setDirectories: setDirectories,
    setLastAccessedDirectory: setLastAccessedDirectory,
  })

  return (
    <Layout>
      <APIContext.Provider value={apiContext}>
        <CollectionContext.Provider value={collectionContext}>
          <DirectoriesContext.Provider value={directoriesContext}>
            <ImageGroupContext.Provider value={imageGroupContext}>
              <Router basepath='/collection'>
                <PrivateRoute path='/' component={AllCollections} location={location} />
                <PrivateRoute path='/:id' component={Collection} location={location} />
              </Router>
            </ImageGroupContext.Provider>
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
