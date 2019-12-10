// @flow
let MultiEntrypointAliases;

const { createContentDigest } = require('gatsby-core-utils');

try {
  // eslint-disable-next-line
  MultiEntrypointAliases = require('./aliases-written-map.json');
} catch (e) {
  throw new Error(
    'ERROR - Local aliases have not been written. Please write aliases before continuing by running `yarn constellation:aliases`',
  );
}

// BC - I have written this function in a bunch of places and it really needs to be a lib
// sorry for copy-pasting it here again
const divideChangelog = changelog => {
  const splitToken = `__CHANGELOG_SPLIT_${Date.now()}__`;
  return changelog
    .replace(/[\n\r\s]## /g, `${splitToken}## `)
    .split(splitToken)
    .reduce((all, md) => {
      // This should only allow us to skip the first chunk which is the name, as
      // well as the unreleased section.
      const match = md.match(/\d+\.\d+\.\d+/);

      const version = match ? match[0] : null;
      if (!version) return all;
      return all.concat({
        version,
        md,
      });
    }, []);
};

exports.onCreateWebpackConfig = ({ actions, loaders, getConfig }) => {
  actions.setWebpackConfig({
    resolve: {
      mainFields: ['atlaskit:src', 'module', 'browser', 'main'],
      extensions: ['.js', '.ts', '.tsx'],
      alias: MultiEntrypointAliases,
    },
  });
  const config = getConfig();

  config.module.rules = [
    // Omit the default rule where test === '\.jsx?$'
    ...config.module.rules.filter(
      rule => String(rule.test) !== String(/\.jsx?$/),
      // || String(rule.test) !== String(/\.tsx?$/),
    ),
    // Recreate it with custom exclude filter
    // {
    //   test: /\.tsx?$/,
    //   // exclude: /node_modules/,
    //   // Feed the compiled ts files through babel
    //   exclude: modulePath =>
    //     /node_modules/.test(modulePath) &&
    //     /*
    //             What this regex is saying is:
    //             Do not exclude:
    //               - files in node_modules
    //               - that are in a @brisk-docs scoped package
    //               - BUT still exclude things in the node_modules of that package
    //           */
    //     !/node_modules\/@brisk-docs\/[^/]+\/(?!node_modules)/.test(modulePath),
    //   use: [
    //     loaders.js(),
    //     {
    //       loader: require.resolve('ts-loader'),
    //       options: {
    //         transpileOnly: true,
    //       },
    //     },
    //   ],
    // },
    {
      ...loaders.js(),
      test: /\.jsx?$/,
      exclude: modulePath =>
        /node_modules/.test(modulePath) &&
        /*
            What this regex is saying is:
            Do not exclude:
              - files in node_modules
              - that are in a @brisk-docs scoped package
              - BUT still exclude things in the node_modules of that package
          */
        !/node_modules\/@brisk-docs\/[^/]+\/(?!node_modules)/.test(modulePath),
    },
  ];
  actions.replaceWebpackConfig(config);
};
