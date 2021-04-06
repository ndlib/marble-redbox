cp .env.development-example .env.development

GRAPHQL_API_KEY_BASE_PATH='/all/stacks/sm-test-maintain-metadata/'
# add the app sync keys to the env
node ./scripts/codebuild/setupEnv.js ${GRAPHQL_API_KEY_BASE_PATH} >> '.env.development' --unhandled-rejections=strict

node ./scripts/codebuild/setupEnv.js ${GRAPHQL_API_KEY_BASE_PATH}
echo "Reset .env.development and double check your keys."
