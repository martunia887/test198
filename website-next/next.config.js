const withTypescript = require('@zeit/next-typescript');
const webpackConf = require('@atlaskit/webpack-config/config');

module.exports = withTypescript({
  webpack(config, options) {
    const newConfig = { ...config };
    const conf = webpackConf(options);
    delete conf.entry;
    delete conf.output;
    delete conf.plugins;

    newConfig.module.rules = [...newConfig.module.rules, ...conf.module.rules];
    newConfig.resolve.mainFields = conf.resolve.mainFields;
    return newConfig;
  },
  webpackDevMiddleware: config => {
    // Perform customizations to webpack dev middleware config
    // Important: return the modified config
    return config;
  },
});
