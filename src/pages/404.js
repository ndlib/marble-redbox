import React from 'react'
import { Themed } from 'theme-ui'
import Layout from 'components/Layout'

const NotFoundPage = () => (
  <Layout>
    <Themed.h1>NOT FOUND</Themed.h1> { /* eslint-disable-line react/jsx-pascal-case */ }
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
  </Layout>
)

export default NotFoundPage
