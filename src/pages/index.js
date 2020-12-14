/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Link } from 'gatsby'

import Layout from 'components/Layout'

const IndexPage = () => (
  <Layout>
    <p>Red Box is an interim place to manage and connect the library’s digital assets to corresponding descriptive metadata in Aleph and ArchivesSpace to accomplish the goals of the Marble project.</p>
    <Link to='/collection'>Manage Collections</Link>
  </Layout>
)

export default IndexPage
