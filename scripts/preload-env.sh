GRAPHQL_API_KEY_BASE_PATH='/all/stacks/sm-test-maintain-metadata/'
STATIC_SITE_PATH="/all/static-host/marble-redbox-test/"

# add the app sync keys to the env
node ./scripts/codebuild/setupEnv.js ${GRAPHQL_API_KEY_BASE_PATH} > './ssm-params.txt' --unhandled-rejections=strict

# add the config for okta into the env
# node ./scripts/codebuild/setupEnv.js ${STATIC_SITE_PATH} >> './ssm-params.txt' --unhandled-rejections=strict

source ./ssm-params.txt
