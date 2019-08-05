// @flow
const path = require('path');

const pathIsInside = require('path-is-inside');

const trimNodeModules = filenames =>
  filenames.filter(f => !f.includes(`${path.sep}node_modules${path.sep}`));

/**
 * Filters dependent filenames to src files (non node-modules) inside rootPath
 */
const filterDependents = (filenames, rootPath) => {
  // Files inside a package directory
  let pkgDependents = trimNodeModules(filenames).filter(f =>
    pathIsInside(f, rootPath),
  );
  return pkgDependents;
};

const filterPackageJsons = filenames =>
  filenames.filter(filename => path.basename(filename) === 'package.json');
module.exports = {
  onProject: ({ config, dependencies, files, rootPath }) => {
    const errors = filterPackageJsons(Object.keys(files)).reduce(
      (acc, filename) => {
        const error = [];
        let pkg;
        try {
          // eslint-disable-next-line import/no-dynamic-require
          pkg = require(filename);
        } catch (e) {
          if (e.code === 'MODULE_NOT_FOUND') {
            error.push(`Could not resolve ${filename}`);
          } else {
            error.push(
              `Unknown error resolving ${filename}: ${JSON.stringify(e)}`,
            );
          }
          return acc;
        }
        filterDependents(Object.keys(dependencies), rootPath).reduce(
          (acc, curr) => {},
        );

        Object.entries(pkg.dependencies || {}).forEach(dep => {
          // Look through dependency tree starting from pkg rootPath
          // Find an import of dep
          // Once found, return
          // Otherwise append error
        });

        return acc.concat(error);
      },
      [],
    );

    return errors;
  },
};
