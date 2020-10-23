#!/bin/bash
magenta=`tput setaf 5`
reset=`tput sgr0`
PARAM_CONFIG_PATH=''
ENV_FILE='../../.env.production'

echo "${magenta}----- INSTALLATIONS -------${reset}"
# install yarn
npm install -g yarn || { echo "Npm install failed" ;exit 1; }

# install gatsby
yarn global add gatsby-cli || { echo "FATAL: Could not install Gatsby Command Line Tools";exit 1; }

# set yarn as default package manager for gatsby
mkdir ~/.config/gatsby
cp ./scripts/codebuild/config.json ~/.config/gatsby/

pushd scripts/codebuild/

yarn install
node setupEnv.js ${PARAM_CONFIG_PATH} > ${ENV_FILE}

popd


# install app dependencies
yarn install || { echo "yarn install failed" ;exit 1; }
