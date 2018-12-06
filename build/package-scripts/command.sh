#!/bin/bash

set -e

# Extract package name
export PACKAGE_PATH=$(pwd)
export ROOT=$(node -e "console.log(require('path').resolve(__dirname, '../../../'))")
CURRENT_COMMAND=${1}
COMMAND_PATH="${ROOT}/build/package-scripts/commands/${CURRENT_COMMAND}.sh"

source ${ROOT}/build/package-scripts/include/color.sh
source ${ROOT}/build/package-scripts/include/environment.sh

# Make sure the script was invoked under packages folder
if [[ "${PACKAGE_PATH}" != */packages/* ]]; then
  echo -e "${RED}Please execute this script from packages/*. Current working directory: ${PACKAGE_PATH}${NC}"
  exit 1
fi

# Check there is a package.json file
export PACKAGE_NAME=$(basename $PACKAGE_PATH);
export TEAM_NAME=$(basename $(dirname $PACKAGE_PATH))
PACKAGE_JSON_PATH="${ROOT}/packages/${TEAM_NAME}/${PACKAGE_NAME}/package.json"
if [ ! -f ${PACKAGE_JSON_PATH} ]; then
  echo -e "${RED}Cannot find a package.json in ${PACKAGE_JSON_PATH}${NC}"
  exit 1
fi

# Check the argument is a valid command
if [ ! -f ${COMMAND_PATH} ]; then
  echo -e "${RED}${CURRENT_COMMAND} is not a valid command${NC}"
  exit 1
fi

source ${COMMAND_PATH} "${@:2}"
