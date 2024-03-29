// @flow
'use strict';

const path = require('path');
const isReachable = require('is-reachable');
const jest = require('jest');
const meow = require('meow');
const webpack = require('../../build/webdriver-runner/utils/webpack');
const reporting = require('./reporting');

const LONG_RUNNING_TESTS_THRESHOLD_SECS = 10;
let startServer = true;

/*
 * function main() to
 * start and stop webpack-dev-server
 * and run tests
 */

process.env.NODE_ENV = 'test';
process.env.VISUAL_REGRESSION = 'true';

const cli = meow({
  flags: {
    updateSnapshot: {
      type: 'boolean',
      alias: 'u',
    },
    debug: {
      type: 'boolean',
      alias: 'debug',
    },
    watch: {
      type: 'boolean',
      alias: 'watch',
    },
  },
});

if (cli.flags.debug) {
  process.env.DEBUG = 'true';
  process.env.CI = 'true';
}

if (cli.flags.debug || cli.flags.watch) {
  startServer = false;
}

function getExitCode(result /*: any */) {
  return !result || result.success ? 0 : 1;
}

async function runJest(testPaths) {
  const status = await jest.runCLI(
    {
      _: testPaths || cli.input,
      passWithNoTests: true,
      updateSnapshot: cli.flags.updateSnapshot,
      debug: cli.flags.debug,
      watch: cli.flags.watch,
    },
    [process.cwd()],
  );

  return status.results;
}

async function rerunFailedTests(result) {
  const failingTestPaths = result.testResults
    // If a test **suite** fails (where no tests are executed), we should check to see if
    // failureMessage is truthy, as no tests have actually run in this scenario.
    .filter(
      testResult =>
        testResult.numFailingTests > 0 ||
        (testResult.failureMessage && result.numFailedTestSuites > 0),
    )
    .map(testResult => testResult.testFilePath);

  if (!failingTestPaths.length) {
    return getExitCode(result);
  }

  console.log(
    `Re-running ${
      result.numFailedTestSuites
    } test suites.\n${failingTestPaths.join('\n')}`,
  );

  // We don't want to clobber the original results
  // Now we'll upload two test result files.
  process.env.JEST_JUNIT_OUTPUT = path.join(
    process.cwd(),
    'test-reports/junit-rerun.xml',
  );
  const results = await runJest(failingTestPaths);
  return results;
}

function runTestsWithRetry() {
  return new Promise(async resolve => {
    let results;
    let code = 0;
    try {
      results = await runJest();
      const perfStats = results.testResults
        .filter(result => {
          const timeTaken =
            (result.perfStats.end - result.perfStats.start) / 3600;
          return timeTaken > LONG_RUNNING_TESTS_THRESHOLD_SECS;
        })
        .map(result => {
          return {
            testFilePath: result.testFilePath.replace(process.cwd(), ''),
            timeTaken: +(
              (result.perfStats.end - result.perfStats.start) /
              3600
            ).toFixed(2),
          };
        });

      if (perfStats.length) {
        await reporting.reportLongRunningTests(
          perfStats,
          LONG_RUNNING_TESTS_THRESHOLD_SECS,
        );
      }

      code = getExitCode(results);
      console.log('initalTestExitStatus', code);
      // Only retry and report results in CI.
      if (code !== 0 && process.env.CI) {
        results = await rerunFailedTests(results);

        code = getExitCode(results);

        console.log('results after rerun', results);
        console.log('rerunTestExitStatus', code);
        /**
         * If the re-run succeeds,
         * log the previously failed tests to indicate flakiness
         */
        if (code === 0) {
          console.log('reporting test as flaky');
          await reporting.reportFailure(
            results,
            'atlaskit.qa.vr_test.flakiness',
          );
        } else {
          await reporting.reportFailure(
            results,
            'atlaskit.qa.vr_test.testfailure',
          );
        }
      }
    } catch (err) {
      console.error(err.toString());
      resolve(1);
      return;
    }

    resolve(code);
  });
}

async function main() {
  startServer ? await webpack.startDevServer() : console.log('start server');
  await isReachable('http://localhost:9000');
  const code = await runTestsWithRetry();
  console.log(`Exiting tests with exit code: ${+code}`);
  startServer ? await webpack.stopDevServer() : console.log('test completed');
  process.exit(code);
}

main().catch(err => {
  console.error(err.toString());
  process.exit(1);
});
