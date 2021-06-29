import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import { Router } from '@reach/router'
import APIContext, { initialContext as initialApiContext } from 'context/APIContext'
import CollectionContext, { initialContext as initialCollectionContext } from 'context/CollectionContext'
import DirectoriesContext, { initialContext as initialDirectoriesContext } from 'context/DirectoriesContext'
import ImageGroupContext, { initialContext as initialImageGroupContext } from 'context/ImageGroupContext'
import MediaGroupContext, { initialContext as initialMediaGroupContext } from 'context/MediaGroupContext'
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

  const [imageGroup, setImageGroup] = useState(initialImageGroupContext.imageGroup)
  const imageGroupContext = {
    ...initialImageGroupContext,
    imageGroup: imageGroup,
    setImageGroup: setImageGroup,
  }

  const [mediaGroup, setMediaGroup] = useState(initialMediaGroupContext.mediaGroup)
  const mediaGroupContext = {
    ...initialMediaGroupContext,
    mediaGroup: mediaGroup,
    setMediaGroup: setMediaGroup,
  }

  const [imageDirectories, setImageDirectories] = useState(initialDirectoriesContext.imageDirectories)
  const [mediaDirectories, setMediaDirectories] = useState(initialDirectoriesContext.mediaDirectories)
  const directoriesContext = {
    ...initialDirectoriesContext,
    imageDirectories: imageDirectories,
    mediaDirectories: mediaDirectories,
    setImageDirectories: setImageDirectories,
    setMediaDirectories: setMediaDirectories,
  }

  return (
    <Layout>
      <APIContext.Provider value={apiContext}>
        <CollectionContext.Provider value={collectionContext}>
          <DirectoriesContext.Provider value={directoriesContext}>
            <ImageGroupContext.Provider value={imageGroupContext}>
              <MediaGroupContext.Provider value={mediaGroupContext}>
                <Router basepath='/collection'>
                  <PrivateRoute path='/' component={AllCollections} location={location} />
                  <PrivateRoute path='/:id' component={Collection} location={location} />
                </Router>
              </MediaGroupContext.Provider>
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
