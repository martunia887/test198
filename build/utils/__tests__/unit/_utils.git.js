// @flow
const os = require('os');
const fs = require('fs');
const fsExtra = require('fs-extra');
const path = require('path');
const {
  branch,
  checkout,
  commit,
  init,
  fetch,
  remote,
} = require('./../../git');

async function createTmpRemoteRepository() {
  try {
    const tmpOriginDir = fs.mkdtempSync(path.join(os.tmpdir(), 'git-origin-'));
    // Make sure, we are running git inside the temp origin dir.
    process.chdir(tmpOriginDir);
    // Init git in the temp origin dir.
    await init();
    // Commit to master for temp origin.
    await commit('Initial commit for master temp origin');
    // Create develop.
    await branch('develop');
    // Commit to develop for temp origin.
    await commit('Initial commit for develop temp origin');

    return tmpOriginDir;
  } catch (err) {
    throw Error(
      `An error happened while creating the temp origin repository: ${err}`,
    );
  }
}

async function createTmpLocalRepository(tmpOriginRemotePath) {
  try {
    const tmpLocalDir = fs.mkdtempSync(path.join(os.tmpdir(), 'git-local-'));
    // Make sure, we are running git inside the fake origin temp dir.
    process.chdir(tmpLocalDir);
    // Init git in the local temp dir.
    await init();
    // Point to the origin temp remote.
    await remote('origin', `${tmpOriginRemotePath}/.git`);
    // Fetch all the branches.
    await fetch();
    // Checkout master.
    await checkout('master');
    // Commit to master for temp origin.
    await commit('Initial commit for master temp origin');

    return tmpLocalDir;
  } catch (err) {
    throw Error(
      `An error happened while creating the local temp repository: ${err}`,
    );
  }
}

function cleanUp(folderPath) {
  fsExtra.remove(folderPath, err => {
    if (err !== null) {
      throw Error(
        `An error happened while deleting the temp repository: ${folderPath} with this error: ${err}`,
      );
    }
  });
}

module.exports = {
  createTmpRemoteRepository,
  createTmpLocalRepository,
  cleanUp,
};
