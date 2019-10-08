const fs = require('fs');
const { apacheCheck, adgCheck } = require('./licenses');

module.exports = {
  onProject: ({ config, files }) => {
    return Object.keys(files)
      .filter(file => {
        if (!file.endsWith('LICENSE')) return false;
        const contents = fs.readFileSync(file, 'utf-8');
        return config.adg.some(src => file.includes(src))
          ? adgCheck(contents)
          : apacheCheck(contents);
      })
      .map(file => `The LICENSE file is incorrect at ${file}`);
  },
};
