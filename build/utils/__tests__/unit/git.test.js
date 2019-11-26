// @flow
const { getParentFor } = require('./../../git');

describe('getParentFor >', () => {
  test('remove-duplicated-packages should return develop as a parent', async () => {
    const parent = await getParentFor('remove-duplicated-packages');
    expect(parent).toBe('develop');
  });
  test('follow-up-build should return master as a parent', async () => {
    const parent = await getParentFor('follow-up-build');
    expect(parent).toBe('master');
  });
});
