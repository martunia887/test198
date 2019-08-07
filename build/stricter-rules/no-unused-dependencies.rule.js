// @flow
const path = require('path');

const pathIsInside = require('path-is-inside');

const trimNodeModules = (filenames /*: Array<string> */) =>
  filenames.filter(f => !f.includes(`${path.sep}node_modules${path.sep}`));

// Next steps
// 1. Verify it works - investigate css-box-model etc. in core/tree
// 2. Add an 'excludeDeps' config option that excludes deps that are required but not imported
// 3. Handle deps vs devDeps - could make this a 'srcPaths' config option
// 4. Refactor + add docs in the style of atlassian/frontend-guides repo - https://github.com/atlassian/frontend-guides/tree/master/packages/stricter-plugin-tangerine/templates/rules
// 5.

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

const filterPackageJsons = (filenames, rootPath) => {
  const packageJsonMap = {};
  filenames.forEach(filename => {
    const isPackageJson = path.basename(filename) === 'package.json';
    if (isPackageJson) {
      const dirname = path.dirname(filename);
      packageJsonMap[dirname] = {
        ...packageJsonMap[dirname],
        filename,
        isPackage: true,
      };
    }
    const isTsconfig = path.basename(filename) === 'tsconfig.json';
    if (isTsconfig) {
      const dirname = path.dirname(filename);
      packageJsonMap[dirname] = {
        ...packageJsonMap[dirname],
        filename,
        isTypescript: true,
      };
    }
  });
  return Object.entries(packageJsonMap)
    .filter(([dirname, pkg]) => {
      const isTs = pkg.isTypescript;
      if (isTs && pkg.isPackage) {
        const relativeDirname = path.relative(rootPath, dirname);
        console.warn(`Skipping typescript package ${relativeDirname}`);
      }
      return !isTs;
    })
    .map(([, pkg]) => pkg.filename);
};

module.exports = {
  onProject: ({ config, dependencies, files, rootPath }) => {
    const errors = filterPackageJsons(Object.keys(files), rootPath).reduce(
      (acc, filename) => {
        const error = [];
        let pkg;
        try {
          // eslint-disable-next-line import/no-dynamic-require
          pkg = require(`${filename}`);
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

        const relativeFilename = path.relative(rootPath, filename);
        const pkgRootPath = path.dirname(filename);
        const filteredDeps = filterDependents(
          Object.keys(dependencies),
          pkgRootPath,
        );
        if (filteredDeps.length === 0) {
          console.warn(`No deps found for '${relativeFilename}'.`);
          return acc;
        }

        // Stretch goal: Handle devDep vs dep
        // Abstract this into a function that takes dep/devDep & path that they should be 'allowed' in
        Object.entries(pkg.dependencies || {}).forEach(([dep]) => {
          const depExists = filteredDeps.find(depName => {
            const importedDeps = dependencies[depName];
            const foundDep = importedDeps.find(importedDep =>
              dep.includes(importedDep),
            );

            return Boolean(foundDep);
          });

          if (!depExists) {
            acc.push(
              `Dependency '${dep}' is unused in package '${relativeFilename}'`,
            );
          }
        });

        return acc.concat(error);
      },
      [],
    );

    return errors;
  },
};
