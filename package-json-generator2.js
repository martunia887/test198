const glob = require('glob');
const bolt = require('bolt');
const fs = require('fs');
const exec = require('child_process').exec;

// regex used on imports: ../([../]+)package.json repalce with: $1package.json
function generateDummyPackageJSON({ name: packageName, dir }) {
  console.log(packageName);
  return new Promise((resolve, reject) => {
    const packageJSON = require(`${dir}/package.json`);
    if (!packageJSON.main) {
      exec(
        `rm -rf ${dir}/src/package.json && ln -s ${dir}/package.json ${dir}/src/link-2-package.json && ln -s ${dir}/package.json ${dir}/link-2-package.json`,
        () => resolve(),
      );
    } else {
      resolve();
    }
  });
}

async function generateDummyPackageJSONs() {
  const workspaces = await bolt.getWorkspaces();

  const aliasPromises = workspaces.map(workspace =>
    generateDummyPackageJSON(workspace),
  );

  console.log('done');
}

async function main() {
  generateDummyPackageJSONs();
}
main();
