const path = require('path')
const theme = require(path.join(__dirname, 'src/assets/theme.js'))
const activeEnv =
  process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || 'development'
console.log(`Using environment config: '${activeEnv}'`)
require('dotenv').config({
  path: `.env.${activeEnv}`,
})

const s3BucketName = process.env.S3_DEST_BUCKET || ''
const graphqlApiKey = process.env.GRAPHQL_API_KEY || ''
const graphqlApiUrl = process.env.GRAPHQL_API_URL || ''
const authClientURL = process.env.AUTH_CLIENT_URL || ''
const authClientClientId = process.env.AUTH_CLIENT_ID || ''
const authClientIssuer = process.env.AUTH_CLIENT_ISSUER || ''
const marbleUrl = process.env.MARBLE_URL || ''

console.table([
  { variable: 'GRAPHQL_API_KEY:', value: graphqlApiKey },
  { variable: 'GRAPHQL_API_URL:', value: graphqlApiUrl },
  { variable: 'AUTH_CLIENT_URL:', value: authClientURL },
  { variable: 'AUTH_CLIENT_ID:', value: authClientClientId },
  { variable: 'AUTH_CLIENT_ISSUER:', value: authClientIssuer },
  { variable: 'S3_DEST_BUCKET:', value: s3BucketName },
  { variable: 'MARBLE_URL:', value: marbleUrl },
])

module.exports = {
  siteMetadata: {
    title: 'MARBLE Red Box',
    description: 'A thing that does stuff for other things that need stuff.',
    author: 'WSE',
    marbleUrl: marbleUrl,
    apis: {
      graphqlApiKey: graphqlApiKey,
      graphqlApiUrl: graphqlApiUrl,
    },
    auth: {
      url: authClientURL,
      clientId: authClientClientId,
      issuer: authClientIssuer,
    },
  },
  plugins: [
    'gatsby-plugin-theme-ui',
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-offline',
    {
      resolve: 'gatsby-plugin-root-import',
      options: {
        src: path.join(__dirname, 'src'),
        assets: path.join(__dirname, 'src/assets'),
        context: path.join(__dirname, 'src/context'),
        components: path.join(__dirname, 'src/components'),
        pages: path.join(__dirname, 'src/pages'),
        utils: path.join(__dirname, 'src/utils'),
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/assets/images`,
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'marble-redbox',
        short_name: 'redbox',
        start_url: '/',
        background_color: theme.colors.primary,
        theme_color: theme.colors.primary,
        display: 'minimal-ui',
        icon: 'src/assets/images/manifestLogo.png', // This path is relative to the root of the site.
      },
    },
    {
      resolve: 'gatsby-plugin-s3',
      options: {
        bucketName: s3BucketName,
      },
    },
  ],
}
