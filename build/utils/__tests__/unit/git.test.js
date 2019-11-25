// @flow
const { getParentFor } = require('./../../git');

describe('getParentFor >', () => {
  test('investigate-g-parent should return develop as a parent', async () => {
    const parent = await getParentFor('investigate-g-parent');
    expect(parent).toBe('develop');
  });
  test('follow-up-build should return master as a parent', async () => {
    const parent = await getParentFor('follow-up-build');
    expect(parent).toBe('master');
  });
});
