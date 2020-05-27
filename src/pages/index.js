/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Link } from 'gatsby'

import Layout from 'components/Layout'

const IndexPage = () => (
  <Layout>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <Link to='/404'>Go to page 2</Link>
  </Layout>
)

export default IndexPage
