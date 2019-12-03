// @flow
const { getParent } = require('./../../git');

describe('getParentFor >', () => {
  test('replace-changed-script-for-develop should return develop as a parent', async () => {
    const parent = await getParent('replace-changed-script-for-develop');
    expect(parent).toBe('develop');
  });
  test('add-stricter-rules should return master as a parent', async () => {
    const parent = await getParent('add-stricter-rules');
    expect(parent).toBe('master');
  });
});
