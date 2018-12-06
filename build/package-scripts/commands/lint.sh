#!/bin/bash

set -e
set -u

function lint() {
  local pkgType="${1:-}"

  echo -e "${YELLOW}Linting ${PACKAGE_NAME}${NC}"
  if [[ $pkgType = "ts" ]]; then
    lintTs &
  elif [[ $pkgType = "flow" ]]; then
    lintFlow &
  else
    echo 'Must pass type to lint command'
    exit 1
  fi
  lintStyles &
  wait
}

function lintFlow() {
  eslint '**/*.js' --config "${ROOT}/.eslintrc.json" --ignore-path "${ROOT}/.eslintignore"
}

function lintTs() {
  tslint -c "${ROOT}/tslint.sources.json" --format stylish 'src/**/*.+(ts|tsx)' --exclude '**/__tests__/**'
  tslint -c "${ROOT}/tslint.supporting.json" --format stylish '+(tests|__tests__|examples|docs|example-helpers)/**/*.(ts|tsx)' 'src/**/__tests__/**/*.+(ts|tsx)'
}

function lintStyles() {
  stylelint '**/*.{js,ts,tsx}'
}

lint "${1}"
