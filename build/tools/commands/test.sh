#!/bin/bash

set -e
set -u

echo -e "${YELLOW}Testing ${PACKAGE_NAME}${NC}"

yarn jest --config "${ROOT}/jest.config.js" --rootDir "${PACKAGE_PATH}" $@
