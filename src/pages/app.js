import React from 'react'
import { Router } from '@reach/router'
import PrivateRoute from 'components/App/PrivateRoute'
import Layout from 'components/Layout'
// import Profile from "../components/Profile"
// import Details from "../components/Details"
import Login from 'components/App/Login'
import Default from 'components/App/Default'
const App = ({ location }) => {
  return (
    <Layout>
      <Router basepath='/app'>
        <PrivateRoute path='/' component={Default} location={location} />
        <PrivateRoute path='/login' component={Login} location={location} />
        <PrivateRoute path='/collection/:id' component={Default} location={location} />
      </Router>
    </Layout>
  )
}
export default App
