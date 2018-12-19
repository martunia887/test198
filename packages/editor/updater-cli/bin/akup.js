#!/usr/bin/env node
/* eslint-disable */

const path = require('path');
const project = path.join(__dirname, '../tsconfig.json');

require('ts-node').register({ project });

require(path.join('..', 'lib'))
  .run()
  .catch(error => {
    if (typeof error === 'number') {
      process.exit(error);
    }
    console.error(error);
  });
