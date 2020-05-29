import React from 'react'
import { Router } from '@reach/router'
import PrivateRoute from 'components/Layout/PrivateRoute'
import Layout from 'components/Layout'
// import Profile from "../components/Profile"
// import Details from "../components/Details"
import AllCollections from 'components/Pages/AllCollections'
import Collection from 'components/Pages/Collection'
const App = ({ location }) => {
  return (
    <Layout>
      <Router basepath='/collection'>
        <PrivateRoute path='/' component={AllCollections} location={location} />
        <PrivateRoute path='/:id' component={Collection} location={location} />
      </Router>
    </Layout>
  )
}
export default App
