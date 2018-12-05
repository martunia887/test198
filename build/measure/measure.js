const chalk = require('chalk').default;
const fs = require('fs');
const gzipSize = require('gzip-size');
const path = require('path');
const prettyBytes = require('pretty-bytes');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

const options = require('../webpack-config/config')({
  mode: 'production',
  websiteEnv: 'production',
  noMinimize: false,
  report: false,
});

options.entry = {
  main: path.resolve(__dirname, '../../packages', process.argv[2]),
};

options.plugins = options.plugins.slice(2);
const why =
  process.argv.includes('--analyze') || process.argv.includes('--why');

if (why) {
  options.plugins.push(new BundleAnalyzerPlugin());
}

// options.optimization = {
//   splitChunks: {
//     cacheGroups: {
//       // node_modules: {
//       //   test: /[\\/]node_modules[\\/]/,
//       //   name: 'node_modules',
//       //   enforce: true,
//       //   chunks: 'all',
//       // },
//     },
//   },
// };

// for (const corePackage of fs.readdirSync(
//   path.resolve(__dirname, '../../packages/core'),
// )) {
//   options.optimization.splitChunks.cacheGroups[corePackage] = {
//     test: new RegExp(`[\\/]core[\\/]${corePackage}[\\/]`),
//     name: corePackage,
//     enforce: true,
//     chunks: 'all',
//   };
// }

const ignoreModules = ['styled-components', 'react', 'react-dom'];

options.resolve.alias = options.resolve.alias || {};
for (const ignore of ignoreModules) {
  options.resolve.alias[ignore] = path.resolve(__dirname, 'noop.js');
}

const combinedOptions = { ...options, output: { ...options.output } };
// delete combinedOptions.optimization;

combinedOptions.output.filename = 'all.js';

const outputDir = path.resolve(__dirname, '../../dist');
const packageOut = path.resolve(outputDir, 'main.js');
// const moduleOut = path.resolve(outputDir, 'node_modules.js');
const combinedOut = path.resolve(outputDir, 'all.js');

const rm = p => {
  if (fs.existsSync(p)) {
    fs.unlinkSync(p);
  }
};

rm(packageOut);
// rm(moduleOut);
rm(combinedOut);

const compiler = webpack(why ? options : [options, combinedOptions]);
compiler.run((err, s) => {
  if (err) {
    return console.error(chalk.red(err));
  }

  if (!fs.existsSync(packageOut)) {
    return console.error(s.toString({ colors: true }));
  }

  const stats = [fStats(packageOut)];

  console.log(chalk.cyan('Module successfully built:\n'));
  console.log(
    chalk.yellow('  Source Code:'),
    chalk.green(prettyBytes(stats[0].size)),
    `(${chalk.red(prettyBytes(stats[0].gzipSize))})`,
  );
  // console.log(
  //   chalk.yellow('  Dependencies:'),
  //   chalk.green(prettyBytes(stats[1].size)),
  //   `(${chalk.red(prettyBytes(stats[1].gzipSize))})`,
  // );

  if (!why) {
    const all = fStats(combinedOut);
    console.log(
      chalk.yellow('  Combined:'),
      chalk.green(prettyBytes(all.size)),
      `(${chalk.red(prettyBytes(all.gzipSize))})`,
    );
  }
});

function fStats(filePath) {
  return {
    size: fs.statSync(filePath).size,
    gzipSize: gzipSize.sync(fs.readFileSync(filePath)),
  };
}
