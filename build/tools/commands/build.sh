#!/bin/bash

set -e
set -u

function build() {
  local pkgType="${1:-}"

  rm -rf ${PACKAGE_PATH}/dist
  buildPkg
  if [[ $pkgType = "ts" ]]; then
    buildTs
  elif [[ $pkgType = "flow" ]]; then
    buildFlow
  else
    echo 'Must pass build type to build command'
    exit 1
  fi
}

function buildBabel() {
  buildCjs &
  buildEsm &
  wait
}

function buildPkg() {
  copy-pkg package.json dist/package.json --only name,version,sideEffects
}

function buildFlow() {
  buildBabel &
  wait
  buildFlowTypes
}

function buildCjs() {
  echo -e "${YELLOW}Building cjs modules for ${PACKAGE_NAME}${NC}"
  NODE_ENV=production BABEL_ENV=production:cjs babel src -d dist/cjs --root-mode upward
}

function buildEsm() {
  echo -e "${YELLOW}Building es modules for ${PACKAGE_NAME}${NC}"
  NODE_ENV=production BABEL_ENV=production:esm babel src -d dist/esm --root-mode upward
}

function buildTs() {
  buildEs5 &
  buildEs2015 &
  wait
}

function buildEs5() {
  NODE_ENV=production tsc --project ./build/es5
}

function buildEs2015() {
  NODE_ENV=production tsc --project ./build/es2015
}

function buildFlowTypes() {
  echo -e "${YELLOW}Copying flow types for ${PACKAGE_NAME}${NC}"
  buildFlowTypesEsm > /dev/null &
  buildFlowTypesCjs > /dev/null &
  wait
}

function buildFlowTypesEsm() {
  flow-copy-source -v -i '**/__tests__/**' src dist/esm
}

function buildFlowTypesCjs() {
  flow-copy-source -v -i '**/__tests__/**' src dist/esm
}

build "${1}"
