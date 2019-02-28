import { name, version } from './package.json';

const nextMajorVersion = () => {
  if (version === 'DEVELOPMENT_VERSION') {
    return 'DEVELOPMENT_VERSION';
  }

  return [Number(version.split('.')[0]) + 1, 0, 0].join('.');
};

export { name, version, nextMajorVersion };
