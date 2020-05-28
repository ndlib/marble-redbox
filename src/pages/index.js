/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Link } from 'gatsby'

import Layout from 'components/Layout'

const IndexPage = () => (
  <Layout>
    <p>Welcome to MARBLE RedBox a site that does stuff with stuff to make stuff for things that need stuff.</p>
    <Link to='/collection'>Do stuff</Link>
  </Layout>
)

export default IndexPage
