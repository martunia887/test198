//@flow
'use strict';
/*
 * Utilities helper to return all the examples and filter them by packages
 */
const boltQuery = require('bolt-query');
const glob = require('glob');
const path = require('path');

const cwd = process.cwd();

// Get all examples for a specified package using Bolt-Query
async function getExamplesForAsync(
  pkgName /*: string */,
) /*: Promise<Array<string>> */ {
  const project /*: any */ = await boltQuery({
    cwd: path.join(__dirname, '..'),
    workspaceFiles: {
      examples: 'examples/*.+(js|ts|tsx)',
    },
  });
  let examplesArr = [];
  project.workspaces.forEach(workspace => {
    if (workspace.pkg) {
      if (
        // compare like for like if pkgName includes scope
        (pkgName[0] === '@' && workspace.pkg.name === pkgName) ||
        // otherwise compare text after scope
        workspace.pkg.name.split('/')[1] === pkgName
      ) {
        examplesArr.push(...workspace.files.examples);
      }
    }
  });
  return examplesArr;
}

// get all examples from the code sync
function getExamplesSync(packageName /*: string */) /*: Array<Object> */ {
  return glob
    .sync(`**/packages/**/${packageName}/examples/*.+(js|jsx|ts|tsx)`, {
      ignore: '**/node_modules/**',
    })
    .map(file => {
      const fileName = file
        .split('/examples/')
        .pop()
        .replace(/\.[^.]*$/, '')
        .replace(/^\d+\-\s*/, '');
      return {
        name: fileName,
        filePath: `${cwd}/${file}`,
      };
    });
}
module.exports = { getExamplesForAsync, getExamplesSync };
