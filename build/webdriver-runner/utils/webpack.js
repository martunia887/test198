// @flow
'use strict';
/*
 * util module to build webpack-dev-server for running integration test.
 * const CHANGED_PACKAGES accepts environment variable which is used to
 * identify changed packages and return changed packages containing webdriverTests to be built.
 */

// Start of the hack for the issue with the webpack watcher that leads to it dying in attempt of watching files
// in node_modules folder which contains circular symbolic links
const DirectoryWatcher = require('watchpack/lib/DirectoryWatcher');
const _oldcreateNestedWatcher = DirectoryWatcher.prototype.createNestedWatcher;
DirectoryWatcher.prototype.createNestedWatcher = function(
  dirPath /*: string */,
) {
  // Any new files created under src/ will trigger a rebuild when in watch mode
  // If we are just adding snapshots or updating tests, we can safely ignore those
  if (dirPath.includes('__snapshots__')) return;
  if (dirPath.includes('__image_snapshots__')) return;
  if (
    dirPath.includes('__tests__') &&
    !dirPath.includes('integration') &&
    !dirPath.includes('visual-regression')
  )
    return;
  if (dirPath.includes('__tests-karma__')) return;
  if (dirPath.includes('node_modules')) return;
  _oldcreateNestedWatcher.call(this, dirPath);
};

const flattenDeep = require('lodash.flattendeep');
const bolt = require('bolt');
const boltQuery = require('bolt-query');
const glob = require('glob');
const path = require('path');
const minimatch = require('minimatch');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const historyApiFallback = require('connect-history-api-fallback');

const createConfig = require('@atlaskit/webpack-config');
const {
  print,
  devServerBanner,
  errorMsg,
} = require('@atlaskit/webpack-config/banner');
const utils = require('@atlaskit/webpack-config/config/utils');

const HOST = '0.0.0.0';
const PORT = 9000;
const WEBPACK_BUILD_TIMEOUT = 10000;
const CHANGED_PACKAGES = process.env.CHANGED_PACKAGES;

let server;
let config;

const pattern = process.argv[2] || '';

function packageIsInPatternOrChanged(workspace) {
  if (!workspace.files.matchedTests.length) return false;
  if (pattern === '' && !CHANGED_PACKAGES) return true;

  /**
   * If the CHANGED_PACKAGES variable is set,
   * parsing it to get an array of changed packages and only
   * build those packages.
   */
  if (CHANGED_PACKAGES) {
    let parsedChangedPackages = JSON.parse(CHANGED_PACKAGES);
    // Recently, we had issues with webpack changes and without running any tests.
    // Now, when a change is applied to webpack, it will run tests for the website.
    // The if below is just to avoid running the website tests.
    if (
      parsedChangedPackages.includes('build/webpack-config') &&
      !parsedChangedPackages.includes('website')
    ) {
      parsedChangedPackages = parsedChangedPackages.map(pkg =>
        pkg.replace('build/webpack-config', 'website'),
      );
    }
    return parsedChangedPackages.some(pkg => workspace.dir.includes(pkg));
  }
  /* Match and existing pattern is passed through the command line */
  return pattern.length < workspace.dir.length
    ? workspace.dir.includes(pattern)
    : pattern.includes(workspace.dir);
}

async function getPackagesWithTests() /*: Promise<Array<string>> */ {
  const testPattern = process.env.VISUAL_REGRESSION
    ? 'visual-regression'
    : 'integration';
  const project /*: any */ = await boltQuery({
    cwd: path.join(__dirname, '..'),
    workspaceFiles: {
      matchedTests: `{src/**/__tests__,__tests__}/${testPattern}/*.+(js|ts|tsx)`,
    },
  });
  return project.workspaces
    .filter(packageIsInPatternOrChanged)
    .map(workspace => workspace.pkg.name.split('/')[1]);
}

//
// Creating webpack instance
//
async function startDevServer() {
  const workspacesGlob = await getPackagesWithTests();
  const isWatchEnabled = process.env.WATCH === 'true';
  const mode = 'development';
  const websiteEnv = 'local';
  const projectRoot = (await bolt.getProject({ cwd: process.cwd() })).dir;
  const workspaces = await bolt.getWorkspaces();
  const filteredWorkspaces = workspacesGlob
    ? workspacesGlob.map(pkg =>
        workspaces.filter(ws => minimatch(ws.dir, pkg, { matchBase: true })),
      )
    : workspaces;

  let globs = workspacesGlob
    ? utils.createWorkspacesGlob(flattenDeep(filteredWorkspaces), projectRoot)
    : utils.createDefaultGlob();

  /* At the moment, the website and webpack folders do not build a package and it is not possible to test it.
  ** The current workaround, we build another package that builds the homepage and indirectly test the website.
  ** We picked the package polyfills:
   - the package is internal.
   - no integration tests will be added.
   - changes to the package will not impact the build system.
  */
  if (['website', 'webpack'].indexOf(globs) === -1) {
    globs = globs.map(glob =>
      glob
        .replace('website', 'packages/core/polyfills')
        .replace('build/webpack-config', 'packages/core/polyfills'),
    );
  }
  if (!globs.length) {
    console.info('Nothing to run or pattern does not match!');
    process.exit(0);
  }

  config = await createConfig({
    globs,
    mode,
    websiteEnv,
    websiteDir: path.join(__dirname, '../../..', 'website'),
  });

  let extraOpts = {};
  let ignored;
  if (!isWatchEnabled) {
    extraOpts = {
      watch: false,
    };
    ignored = ['**/*'];
  }

  const compiler = webpack({ ...config, ...extraOpts });

  //
  // Starting Webpack Dev Server
  //

  server = new WebpackDevServer(compiler, {
    // Enable gzip compression of generated files.
    compress: true,
    historyApiFallback: true,

    //silence webpack logs
    quiet: true,
    noInfo: false,
    overlay: false,
    disableHostCheck: true,

    // disable hot reload for tests - they don't need it for running
    hot: false,
    inline: false,
    watchOptions: {
      ignored,
    },
  });

  return new Promise((resolve, reject) => {
    let hasValidDepGraph = true;

    compiler.hooks.invalid.tap('invalid', fileName => {
      hasValidDepGraph = false;
      console.log(
        'Something has changed and Webpack needs to invalidate dependencies graph',
        fileName,
      );
    });

    compiler.hooks.done.tap('done', () => {
      hasValidDepGraph = true;
      setTimeout(() => {
        if (hasValidDepGraph) {
          resolve();
          console.log('Compiled Packages!');
        }
      }, WEBPACK_BUILD_TIMEOUT);
    });

    server.listen(PORT, HOST, err => {
      if (err) {
        console.log(err.stack || err);
        return reject(1);
      }
      server.use(
        historyApiFallback({
          disableDotRule: true,
          htmlAcceptHeaders: ['text/html'],
        }),
      );
    });
  });
}

function stopDevServer() {
  server.close();
}

module.exports = { startDevServer, stopDevServer };
