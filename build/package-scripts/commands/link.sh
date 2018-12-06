#!/bin/bash

set -e
set -u

echo -e "${YELLOW}Building all packages (dependencies need to be built for linking to work) ${NC}"
# Bolt incorrectly errors out at the end when running a project level script
# https://github.com/boltpkg/bolt/issues/209
set +e
bolt project run build
set -e
echo -e "${RED}Ignore the error above, it is an issue with bolt${NC}"

echo -e "${YELLOW}Linking ${PACKAGE_NAME}${NC}"

yarn link

echo -e "${YELLOW}Linking styled-components${NC}"
cd "${ROOT}/node_modules/styled-components"
yarn link

echo -e "${CYAN}Link styled-components as well if you encounter issues with multiple versions${NC}"
