import React from 'react'
import { Router } from '@reach/router'
import PrivateRoute from 'components/Layout/PrivateRoute'
import Layout from 'components/Layout'
import Login from 'components/Pages/Login'
import AllCollections from 'components/Pages/AllCollections'
import Collection from 'components/Pages/Collection'

const App = ({ location }) => {
  return (
    <Layout>
      <Router basepath='/app'>
        <PrivateRoute path='/' component={AllCollections} location={location} />
        <PrivateRoute path='/login' component={Login} location={location} />
        <PrivateRoute path='/collection/:id' component={Collection} location={location} />
      </Router>
    </Layout>
  )
}
export default App
