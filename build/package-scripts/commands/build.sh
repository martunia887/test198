#!/bin/bash

set -e
set -u

# NOTE: The watch-related logic here won't work with custom package build steps or the package.json copy over.
#       Npm-watch can be used in the package instead for a more robust build:watch solution, see @atlaskit/navigation-next

function build() {
  local pkgType="${1:-}"
  local watchMode="${2:-}"
  if [[ $watchMode = "--watch" ]]; then
    # Add verbose flag so we can see CLI updating when we make changes
    # See https://github.com/babel/babel/issues/7926
    export WATCH_MODE="--watch --verbose"
  else
    export WATCH_MODE=""
  fi

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

  wait
}

function waitIfNotWatch() {
  if [[ $WATCH_MODE != '--watch' ]]; then
    wait
  fi
}

function buildBabel() {
  buildCjs &
  buildEsm &
  waitIfNotWatch
}

function buildPkg() {
  copy-pkg package.json dist/package.json --only name,version,sideEffects
}

function buildFlow() {
  buildBabel &
  waitIfNotWatch
  buildFlowTypes
}

function buildCjs() {
  echo -e "${YELLOW}Building cjs modules for ${PACKAGE_NAME}${NC}"
  NODE_ENV=production BABEL_ENV=production:cjs babel src -d dist/cjs --root-mode upward $WATCH_MODE
}

function buildEsm() {
  echo -e "${YELLOW}Building es modules for ${PACKAGE_NAME}${NC}"
  NODE_ENV=production BABEL_ENV=production:esm babel src -d dist/esm --root-mode upward $WATCH_MODE
}

function buildTs() {
  buildEs5 &
  buildEs2015 &
  waitIfNotWatch
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
  waitIfNotWatch
}

function buildFlowTypesEsm() {
  flow-copy-source -v -i '**/__tests__/**' src dist/esm $WATCH_MODE
}

function buildFlowTypesCjs() {
  flow-copy-source -v -i '**/__tests__/**' src dist/cjs $WATCH_MODE
}

build $@
