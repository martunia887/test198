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
// const url = process.env.DOCKER ? 'http://host.docker.internal:9000' : 'http://localhost:9000';
const isCreateSnapshot = process.env.CREATE_SNAPSHOT === 'true';
const isLocalRun = process.env.RUN_LOCAL_ONLY === 'true';
const watch = process.env.WATCH ? '--watch' : '';

// move logic to remove all production snapshots before test starts
function removeSnapshotDir() {
  const filteredList = glob
    .sync('**/packages/**/__image_snapshots__/', {
      ignore: '**/node_modules/**',
    })
    .map(dir => {
      fs.removeSync(dir);
    });
}

// function to generate snapshot from local branch
function getSnapshots() {
  return new Promise((resolve, reject) => {
    let cmd = `VISUAL_REGRESSION=true PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true jest -u`;
    if (watch) {
      cmd = `${cmd} --watch`;
    }
    runCommand(cmd, resolve, reject);
  });
}

// function to run tests and compare snapshot against prod snapshot
function runTests() {
  return new Promise((resolve, reject) => {
    const cmd = `VISUAL_REGRESSION=true DOCKER=true PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true jest`;
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
  const serverAlreadyRunning = await isReachable('http://localhost:9000');
  let snapshotStatus /*: {code: number, signal: any}*/ = {
    code: 0,
    signal: '',
  };
  // TODO: to decide if we remove the snapshots
  // removeSnapshotDir();

  if (!serverAlreadyRunning && isCreateSnapshot) {
    // Overriding the env variable to start the correct packages
    process.env.VISUAL_REGRESSION = 'true';
    await webpack.startDevServer();
  }

  if (isCreateSnapshot) {
    snapshotStatus = await getSnapshots();
    const serverDockerAlreadyRunning = await isReachable(
      'http://host.docker.internal:9000',
    );
    console.log('Where I am');
    console.log(serverDockerAlreadyRunning);

    console.log(
      `Exiting tests with exit code: ${snapshotStatus.code} and signal: ${
        snapshotStatus.signal
      }`,
    );
    if (snapshotStatus.code !== 0) process.exit(snapshotStatus.code);
  } else {
    const { code, signal } = await runTests();
    console.log(`Exiting tests with exit code: ${code} and signal: ${signal}`);
    process.exit(code);
  }

  if (!serverAlreadyRunning && isCreateSnapshot) {
    webpack.stopDevServer();
  }
}

main().catch(err => {
  console.error(err.toString());
  process.exit(1);
});
