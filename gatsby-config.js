const path = require('path')
const theme = require(path.join(__dirname, 'src/assets/theme.js'))
module.exports = {
  siteMetadata: {
    title: 'MARBLE RedBox',
    description: 'A thing that does stuff for other things that need stuff.',
    author: 'WSE',
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
  ],
}
