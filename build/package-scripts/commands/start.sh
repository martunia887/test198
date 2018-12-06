#!/bin/bash

set -e
set -u

echo -e "${YELLOW}Starting ${PACKAGE_NAME}${NC}"

set +e
bolt project run start "${PACKAGE_NAME}"
set -e
# Bolt incorrectly errors out at the end when running a project level script
# https://github.com/boltpkg/bolt/issues/209
echo -e "${YELLOW}Ignore error above, it is an issue with bolt ${NC}"
