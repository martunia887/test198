#!/usr/bin/env node
/* eslint-disable */

const path = require('path');
const project = path.join(__dirname, '../tsconfig.json');

require('ts-node').register({ project });

require(path.join('..', 'lib')).run();
