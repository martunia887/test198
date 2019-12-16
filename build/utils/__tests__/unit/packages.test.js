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
mockGit.getRef.mockImplementation(branch => branch);

bolt.getProject.mockImplementation(() => ({ dir: 'bar' }));
bolt.getWorkspaces.mockImplementation(() => [
  { dir: 'master' },
  { dir: 'develop' },
]);

describe('getChangedPackages', () => {
  beforeEach(() => {
    mockGit.getBaseBranch.mockReset();
  });
  test('It returns changed packages from calculated base branch', async () => {
    mockGit.getBaseBranch.mockImplementationOnce(() => 'develop');
    const changedPackagesFromDevelop = await getChangedPackages('fix/bug');
    expect(changedPackagesFromDevelop).toMatchObject([{ dir: 'develop' }]);

    mockGit.getBaseBranch.mockImplementationOnce(() => 'master');
    const changedPackagesFromMaster = await getChangedPackages('fix/bug');
    expect(changedPackagesFromMaster).toMatchObject([{ dir: 'master' }]);
  });
  test('if source branch is a release branch, it returns changed packages from master', async () => {
    mockGit.getBaseBranch.mockImplementationOnce(() => 'develop');
    const changedPackagesFromMaster = await getChangedPackages(
      'release-candidate/foo',
    );
    expect(changedPackagesFromMaster).toMatchObject([{ dir: 'master' }]);
  });
  test('if source branch is develop, it returns changed packages from master', async () => {
    mockGit.getBaseBranch.mockImplementationOnce(() => 'develop');
    const changedPackagesFromMaster = await getChangedPackages('develop');
    expect(changedPackagesFromMaster).toMatchObject([{ dir: 'master' }]);
  });
  test('if source branch is not a release branch, it returns changed packages from calculated branch', async () => {
    mockGit.getBaseBranch.mockImplementationOnce(() => 'develop');
    const changedPackagesFromDevelop = await getChangedPackages('feature/foo');
    expect(changedPackagesFromDevelop).toMatchObject([{ dir: 'develop' }]);
  });
  test('if source branch is not defined, it returns changed packages from master', async () => {
    mockGit.getBaseBranch.mockImplementationOnce(() => 'develop');
    const changedPackagesFromDevelop = await getChangedPackages();
    expect(changedPackagesFromDevelop).toMatchObject([{ dir: 'master' }]);
  });
});
