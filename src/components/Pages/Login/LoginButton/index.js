/** @jsx jsx */
import { jsx, Button } from 'theme-ui'
import PropTypes from 'prop-types'

const LoginButton = ({ authClient }) => {
  return (
    <Button
      onClick={() => {
        authClient.token.getWithRedirect({
          responseType: 'id_token',
          responseMode: 'fragment',
          scopes: [
            'openid',
            'email',
            'profile',
            'netid',
            'directory',
          ],
        })
      }}
      variant='primary'
    >Log in with Notre Dame Campus Authentication
    </Button>
  )
}

LoginButton.propTypes = {
  authClient: PropTypes.shape({
    token: PropTypes.shape({
      getWithRedirect: PropTypes.func.isRequired,
    }).isRequired,
  }).isRequired,
}

export default LoginButton
