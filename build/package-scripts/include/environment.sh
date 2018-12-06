#!/bin/bash

NODE_VERSION=$(node -v)
NVM_NODE_VERSION=$(cat ${ROOT}/.nvmrc | xargs echo -n)

if [ ${CURRENT_COMMAND} != "clean" ] && [ ! -d "${ROOT}/node_modules" ]; then
  echo -e "${RED}Please run \"bolt install\" first${NC}"
  exit 1
fi

if [[ ${npm_config_user_agent} != yarn* ]]; then
  echo -e "${RED}You are using NPM. Please run \"bolt clean\" then \"bolt install\"${NC}"
  exit 1
fi

if [[ ${NODE_VERSION} != ${NVM_NODE_VERSION} ]]; then
  echo -e "${RED}You are using wrong node version ${NODE_VERSION}. Expected version is ${NVM_NODE_VERSION}. Please run \"nvm install && nvm use\"${NC}"
  exit 1
fi
