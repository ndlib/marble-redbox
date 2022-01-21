#!/bin/bash
magenta=`tput setaf 5`
reset=`tput sgr0`

# ENV_FILE='.env.production'

# AWS parameter store key path(ex: /all/static-host/<stackname>/)
# must contain search_url and search_index key/values
# pass in 'local' for dev settings
# export PARAM_CONFIG_PATH=${PARAM_CONFIG_PATH:=$1}
# if [[ -z "$PARAM_CONFIG_PATH" ]]; then
#     echo "FATAL: Elasticsearch configuration required"
#     echo "export PARAM_CONFIG_PATH=/all/static-host/<stackname>/"
#     exit 2
# fi

# if [ $BUILD_ENVIRONMENT == "test" ]; then
#   cp .env.production-test .env.production
# fi

echo "${magenta}----- INSTALLATIONS -------${reset}"
# install yarn
npm install -g yarn || { echo "Npm install failed" ;exit 1; }

# install gatsby
yarn global add gatsby-cli || { echo "FATAL: Could not install Gatsby Command Line Tools";exit 1; }

# set yarn as default package manager for gatsby
mkdir ~/.config/gatsby
cp ./scripts/codebuild/config.json ~/.config/gatsby/

yarn install || { echo "yarn install failed" ;exit 1; }

# add the keys at /all/static/hostname to the env
# echo "Loading ${PARAM_CONFIG_PATH}"
# node ./scripts/codebuild/setupEnv.js ${PARAM_CONFIG_PATH} > ./ssm-params.txt --unhandled-rejections=strict

# put the env sourced vars in the environment file.
# echo "S3_DEST_BUCKET='${S3_DEST_BUCKET}'" >> $ENV_FILE
# echo "GRAPHQL_KEY_BASE='${GRAPHQL_KEY_BASE}'" >> $ENV_FILE

# add the app sync keys to the env
# echo "Loading ${GRAPHQL_KEY_BASE}"
# node ./scripts/codebuild/setupEnv.js ${GRAPHQL_KEY_BASE} >> $ENV_FILE --unhandled-rejections=strict

# trap all errors as failure counts
failures=0
trap 'failures=$((failures+1))' ERR

yarn test

if ((failures != 0)); then
  echo "${magenta}TESTS FAILED${reset}"
  exit 1
fi

yarn build

yarn deploy
