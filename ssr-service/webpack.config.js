// @flow
const nodeExternals = require('webpack-node-externals');
const path = require('path');

module.exports = [
  {
    mode: 'development',
    entry: './src/client.js',
    output: {
      filename: 'client.js',
      path: path.join(__dirname),
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: 'babel-loader',
        },
      ],
    },
  },
  {
    mode: 'development',
    entry: './src/server.js',
    output: {
      filename: 'server.js',
      path: path.join(__dirname, '/dist'),
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: 'babel-loader',
        },
        {
          test: /^@atlaskit\.*\.js$/,
          use: 'babel-loader',
        },
      ],
    },
    target: 'node',
    externals: [
      nodeExternals({
        whitelist: [/^@atlaskit/, /react/],
      }),
    ],
  },
];
