cp .env.development-example .env.development

# add the app sync keys to the env
node ./scripts/codebuild/setupEnv.js ${GRAPHQL_API_KEY_BASE_PATH} >> '.env.development' --unhandled-rejections=strict

echo "Reset .env.development and double check your keys."
