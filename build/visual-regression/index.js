// @flow

const child = require('child_process');
const isReachable = require('is-reachable');
const webpack = require('../../build/webdriver-runner/utils/webpack');
const fs = require('fs-extra');
const glob = require('glob');

/*
 * function main() to
 * start and stop webpack-dev-server,
 * and run and wait for visual-regression tests complete
 */
const JEST_WAIT_FOR_INPUT_TIMEOUT = 1000;
// process.env.VISUAL_REGRESSION = 'true';
const watch = process.env.WATCH ? '--watch' : '';
const updateSnapshot = process.env.SNAPSHOT ? '--u' : '';

// function to generate snapshot from production website
function runTests() {
  return new Promise((resolve, reject) => {
    let cmd = `VISUAL_REGRESSION=true jest`;
    if (watch) {
      cmd = `${cmd} ${watch}`;
    }
    if (updateSnapshot) {
      cmd = `${cmd} ${updateSnapshot}`;
    }
    console.log('command running', cmd);
    console.log(`${process.env.VISUAL_REGRESSION}`);

    runCommand(cmd, resolve, reject);
  });
}

function runCommand(cmd, resolve, reject) {
  const tests = child.spawn(cmd, process.argv.slice(2), {
    stdio: 'inherit',
    shell: true,
  });

  tests.on('error', reject);

  tests.on('close', (code, signal) => {
    setTimeout(resolve, JEST_WAIT_FOR_INPUT_TIMEOUT, { code, signal });
  });
}

async function main() {
  let url = 'http://localhost:9000';
  console.log('isdocker:', process.env.IMAGE_SNAPSHOT);
  if (process.env.IMAGE_SNAPSHOT) url = 'http://testing.local.com:9000';
  console.log('trying to reach:', url);
  let serverAlreadyRunning = await isReachable(url);
  console.log('Running:', serverAlreadyRunning);

  if (!serverAlreadyRunning) {
    // Overriding the env variable to start the correct packages
    await webpack.startDevServer();
  }

  const { code, signal } = await runTests();
  console.log(`exiting test with code:${code} and signal: ${signal}`);

  if (!serverAlreadyRunning) {
    webpack.stopDevServer();
  }
  process.exit(code);
}

main().catch(err => {
  console.error(err.toString());
  process.exit(1);
});
