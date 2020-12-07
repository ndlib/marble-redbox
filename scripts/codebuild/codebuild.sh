#!/bin/bash
magenta=`tput setaf 5`
reset=`tput sgr0`
PARAM_CONFIG_PATH='/all/atacks/AppSyncPlayground'
ENV_FILE='.env.production'

echo "${magenta}----- INSTALLATIONS -------${reset}"
# install yarn
npm install -g yarn || { echo "Npm install failed" ;exit 1; }

# install gatsby
yarn global add gatsby-cli || { echo "FATAL: Could not install Gatsby Command Line Tools";exit 1; }

# set yarn as default package manager for gatsby
mkdir ~/.config/gatsby
cp ./scripts/codebuild/config.json ~/.config/gatsby/

yarn install || { echo "yarn install failed" ;exit 1; }

# node setupEnv.js ${PARAM_CONFIG_PATH} > ${ENV_FILE}
curl https://presentation-iiif.library.nd.edu/save > ${ENV_FILE}


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
