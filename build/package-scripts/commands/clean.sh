#!/bin/bash

set -e
set -u

echo -e "${YELLOW}Cleaning ${PACKAGE_NAME}${NC}"

rm -rf \
    ${PACKAGE_PATH}/dist

if [[ "${1}" != 'build' ]]; then
  rm -rf ${PACKAGE_PATH}/node_modules
fi
