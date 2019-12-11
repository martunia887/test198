// @flow

const path = require('path');
const bolt = require('bolt');
const git = require('./git');

async function getChangedPackagesSinceCommit(commit) {
  const changedFiles = await git.getChangedFilesSince(commit, true);
  const project = await bolt.getProject();
  const projectDir = project.dir;
  const workspaces = await bolt.getWorkspaces();
  // we'll add the relativeDir's to these so we have more information to work from later
  const allPackages = workspaces.map(pkg => ({
    ...pkg,
    relativeDir: path.relative(projectDir, pkg.dir),
  }));

  const fileNameToPackage = fileName =>
    allPackages.find(pkg => fileName.startsWith(pkg.dir + path.sep));
  const fileExistsInPackage = fileName => !!fileNameToPackage(fileName);

  return (
    changedFiles
      .filter(fileName => !fileName.endsWith('bundle-size-ratchet.json'))
      // ignore deleted files
      .filter(fileName => fileExistsInPackage(fileName))
      .map(fileName => fileNameToPackage(fileName))
      // filter, so that we have only unique packages
      .filter((pkg, idx, packages) => packages.indexOf(pkg) === idx)
  );
}

// Safe to use this one in master branch as it showing changes since some commit as opposed to a branch head.
async function getChangedPackagesSincePublishCommit() {
  const lastRelease = await git.getLastPublishCommit();
  return getChangedPackagesSinceCommit(lastRelease);
}

// Note: This returns the packages that have changed AND been committed since master,
// it wont include staged/unstaged changes.
//
// Don't use this function in master branch as it returns nothing in that case.
async function getChangedPackagesSinceMaster() {
  const masterRef = await git.getMasterRef();
  return getChangedPackagesSinceCommit(masterRef);
}

// Note: This returns the packages that have changed AND been committed since develop,
// it wont include staged/unstaged changes.
async function getChangedPackagesSinceDevelop() {
  const developRef = await git.getDevelopRef();
  return getChangedPackagesSinceCommit(developRef);
}

async function getChangedPackages(
  targetBranch /*: ?string */,
  sourceBranch /*: ?string */,
) {
  // TODO: This is duplicated in scheduled-releases folder because it is using js for now. To remove when we move all build packages in TS.
  const ReleaseBranchPrefix = 'release-candidate/';
  const isReleaseBranch = `${sourceBranch || ''}`.startsWith(
    ReleaseBranchPrefix,
  );

  const isDevelop = `${sourceBranch || ''}` === 'develop';

  const branch = isReleaseBranch || isDevelop ? 'master' : targetBranch;

  const parent = branch || (await git.getParentBranch());
  return parent === 'develop'
    ? getChangedPackagesSinceDevelop()
    : getChangedPackagesSinceMaster();
}

module.exports = {
  getChangedPackagesSincePublishCommit,
  getChangedPackagesSinceMaster,
  getChangedPackages,
};
