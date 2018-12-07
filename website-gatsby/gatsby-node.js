const webpackConf = require('@atlaskit/webpack-config/config');

exports.onCreateWebpackConfig = ({
  stage,
  rules,
  loaders,
  plugins,
  actions,
}) => {
  const config = webpackConf({});
  delete config.entry;
  delete config.output;
  delete config.plugins;
  actions.setWebpackConfig(config);
};
