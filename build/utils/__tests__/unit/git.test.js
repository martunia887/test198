// @flow
const { getParent } = require('./../../git');

describe('getParentFor >', () => {
  test('remove-duplicated-packages should return develop as a parent', async () => {
    const parent = await getParent('remove-duplicated-packages');
    expect(parent).toBe('develop');
  });
  test('add-stricter-rules should return master as a parent', async () => {
    const parent = await getParent('add-stricter-rules');
    expect(parent).toBe('master');
  });
});
