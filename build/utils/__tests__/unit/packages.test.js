// @flow
jest.enableAutomock();
jest.unmock('../../packages');
const bolt = require('bolt');
const git = require('../../git');
const { getChangedPackages } = require('../../packages');

const mockGit /*: any*/ = git;
mockGit.getChangedFilesSince.mockImplementation(commit => {
  if (['master', 'develop'].includes(commit)) {
    return [`${commit}/file`];
  }
  throw Error('Invalid commit');
});
mockGit.getMasterRef.mockImplementation(() => 'master');
mockGit.getDevelopRef.mockImplementation(() => 'develop');

bolt.getProject.mockImplementation(() => ({ dir: 'bar' }));
bolt.getWorkspaces.mockImplementation(() => [
  { dir: 'master' },
  { dir: 'develop' },
]);

describe('getChangedPackages', () => {
  beforeEach(() => {
    mockGit.getParentBranch.mockReset();
  });
  test('if target branch is not defined, it returns changed packages from calculated parent branch', async () => {
    mockGit.getParentBranch.mockImplementationOnce(() => 'develop');
    const changedPackagesFromDevelop = await getChangedPackages();
    expect(changedPackagesFromDevelop).toMatchObject([{ dir: 'develop' }]);

    mockGit.getParentBranch.mockImplementationOnce(() => 'master');
    const changedPackagesFromMaster = await getChangedPackages();
    expect(changedPackagesFromMaster).toMatchObject([{ dir: 'master' }]);
  });
  test('if target branch is develop, it returns changed packages from develop', async () => {
    const changedPackagesFromDevelop = await getChangedPackages('develop');
    expect(changedPackagesFromDevelop).toMatchObject([{ dir: 'develop' }]);
  });
  test('if target branch is master, it returns changed packages from master', async () => {
    const changedPackagesFromMaster = await getChangedPackages('master');
    expect(changedPackagesFromMaster).toMatchObject([{ dir: 'master' }]);
  });
  test('if target branch is not defined but source branch is a release branch, it returns changed packages from master', async () => {
    mockGit.getParentBranch.mockImplementationOnce(() => 'develop');
    const changedPackagesFromMaster = await getChangedPackages(
      undefined,
      'release-candidate/foo',
    );
    expect(changedPackagesFromMaster).toMatchObject([{ dir: 'master' }]);
  });
  test('if target branch is not defined and source branch is not a release branch, it returns changed packages from calculated branch', async () => {
    mockGit.getParentBranch.mockImplementationOnce(() => 'develop');
    const changedPackagesFromDevelop = await getChangedPackages(
      undefined,
      'feature/foo',
    );
    expect(changedPackagesFromDevelop).toMatchObject([{ dir: 'develop' }]);
  });
  test('if parent branch is not found, returns changed packages from master', async () => {
    mockGit.getParentBranch.mockImplementationOnce(() => undefined);
    const changedPackagesFromMaster = await getChangedPackages(undefined);
    expect(changedPackagesFromMaster).toMatchObject([{ dir: 'master' }]);
  });
  test('if target branch is not defined but source branch is develop, it returns changed packages from master', async () => {
    mockGit.getParentBranch.mockImplementationOnce(() => 'develop');
    const changedPackagesFromMaster = await getChangedPackages(
      undefined,
      'develop',
    );
    expect(changedPackagesFromMaster).toMatchObject([{ dir: 'master' }]);
  });
});
