# Marble RedBox
[![Maintainability](https://api.codeclimate.com/v1/badges/261cd264e5bba50fe394/maintainability)](https://codeclimate.com/github/ndlib/marble-redbox/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/261cd264e5bba50fe394/test_coverage)](https://codeclimate.com/github/ndlib/marble-redbox/test_coverage)
[![Build Status](https://travis-ci.org/ndlib/marble-redbox.svg?branch=master)](https://travis-ci.org/ndlib/marble-redbox)

Description of what RedBox is and does.

RedBox uses these libraries:
* [Gatsby](https://www.gatsbyjs.com/)
* [Theme UI](https://theme-ui.com/)
* [React Bootstrap](https://react-bootstrap.github.io/)
* [React Icons](https://react-icons.github.io/react-icons/)

Useful commands:

* `yarn clean` - Deletes cached content and settings. If you make changes to any of the `gatsby-*.js` files in the root directory, you probably want to run this.
* `yarn develop` - Starts a live development server at http://localhost:8000 that hot loads changes to code. While the development server is running there is also a GraphQL testing tool available at http://localhost:8000/___graphql.
* `yarn build` - Creates a static build of the site.
* `yarn serve` - Starts a server at http://localhost:9000 using the last result of `yarn build`
* `yarn test` - Runs unit tests once.
* `yarn watch` - Runs unit tests and watches for changes and reruns tests as changes are detected. It also prints out coverage information.
