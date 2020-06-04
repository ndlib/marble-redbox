/** @jsx jsx */
import { jsx } from 'theme-ui'
import PropTypes from 'prop-types'
import Layout from 'components/Layout'
import Login from 'components/Pages/Login'

const UserPage = ({ location }) => (
  <Layout>
    <Login location={location} />
  </Layout>
)

UserPage.propTypes = {
  location: PropTypes.object.isRequired,
}
export default UserPage
