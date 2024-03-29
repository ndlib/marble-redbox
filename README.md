# MARBLE-related
# Archived 2023-05-12 sm
# Marble Red Box

[![Maintainability](https://api.codeclimate.com/v1/badges/261cd264e5bba50fe394/maintainability)](https://codeclimate.com/github/ndlib/marble-redbox/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/261cd264e5bba50fe394/test_coverage)](https://codeclimate.com/github/ndlib/marble-redbox/test_coverage)
[![Build Status](https://travis-ci.org/ndlib/marble-redbox.svg?branch=master)](https://travis-ci.org/ndlib/marble-redbox)

Description of what Red Box is and does. [Reference diagram](https://projects.invisionapp.com/freehand/document/pOlUlLdlz).

Red Box uses these libraries:

- [Gatsby](https://www.gatsbyjs.com/)
- [Reach Router](https://reach.tech/router) (included with Gatsby)
- [Theme UI](https://theme-ui.com/)
- [React Icons](https://react-icons.github.io/react-icons/)

Useful commands:

- `yarn clean` - Deletes cached content and settings. If you make changes to any of the `gatsby-*.js` files in the root directory, you probably want to run this.
- `yarn develop` - Starts a live development server at http://localhost:8000 that hot loads changes to code. While the development server is running there is also a GraphQL testing tool available at http://localhost:8000/___graphql.
- `yarn build` - Creates a static build of the site.
- `yarn serve` - Starts a server at http://localhost:9000 using the last result of `yarn build`
- `yarn test` - Runs unit tests once.
- `yarn watch` - Runs unit tests and watches for changes and reruns tests as changes are detected. It also prints out coverage information.
- `yarn lint` - Run eslint on project to find formatting and syntax issues.
- `yarn deploy` - Copies the build to the s3 bucket in .env.*

# Local Setup.
1. Assume an aws role that can access the keys at the path set in ./scripts/setup-development.sh
2. Call ./scripts/setup-development.sh
3. yarn develop

From then on until the keys expire you can just call
yarn develop

## If the graphql keys expire.
1. Call ./scripts/setup-development.sh

This will reset all the keys to the ones in .env.development-example
