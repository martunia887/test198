// @flow
const {
  branch,
  checkout,
  commit,
  getParentBranch,
  merge,
} = require('./../../git');
const {
  cleanUp,
  createTmpRemoteRepository,
  createTmpLocalRepository,
} = require('./_utils.git');

let cwd = '';
let tmpRemotePath = '';
let tmpLocalPath = '';

beforeAll(async () => {
  cwd = process.cwd();
  tmpRemotePath = await createTmpRemoteRepository();
});

beforeEach(async () => {
  cwd = process.cwd();
  tmpLocalPath = await createTmpLocalRepository(tmpRemotePath);
});

afterEach(async () => {
  process.chdir(cwd);
  cleanUp(tmpLocalPath);
});

afterAll(() => {
  process.chdir(cwd);
  cleanUp(tmpRemotePath);
});

describe('getParentBranch >', () => {
  test('Master should return master as a parent', async () => {
    const parent = await getParentBranch();
    expect(parent).toBe('master');
  });

  test('Develop should return develop as a parent', async () => {
    const parent = await getParentBranch('origin/develop');
    expect(parent).toBe('develop');
  });

  test('A branch tipped off develop should return develop as a parent', async () => {
    await checkout('develop');
    await branch('from-develop');
    await commit('Initial commit for develop temp origin');
    const parent = await getParentBranch();
    expect(parent).toBe('develop');
  });

  test('A branch tipped off master should return master as a parent', async () => {
    await checkout('master');
    await branch('from-master');
    await commit('Initial commit for from-master temp origin');
    const parent = await getParentBranch();
    expect(parent).toBe('master');
  });

  test('A branch tipped off develop and you merge master in should return develop as a parent', async () => {
    await checkout('develop');
    await branch('from-develop');
    await commit('Initial commit for develop temp origin');
    await merge('master');
    const parent = await getParentBranch();
    expect(parent).toBe('develop');
  });
});
