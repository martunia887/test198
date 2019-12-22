// @flow
let MultiEntrypointAliases;

try {
  // eslint-disable-next-line global-require
  MultiEntrypointAliases = require('./aliases-written-map.json');
} catch (e) {
  throw new Error(
    'ERROR - Local aliases have not been written. Please write aliases before continuing by running `yarn constellation:aliases`',
  );
}

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
