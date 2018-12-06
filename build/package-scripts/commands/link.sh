#!/bin/bash

set -e
set -u

echo -e "${YELLOW}Linking ${PACKAGE_NAME}${NC}"

yarn link

echo -e "${YELLOW}Linking styled-components${NC}"
cd "${ROOT}/node_modules/styled-components"
yarn link

echo -e "${CYAN}Link styled-components as well if you encounter issues with multiple versions${NC}"
