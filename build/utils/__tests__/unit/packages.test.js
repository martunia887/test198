// @flow
const { getChangedPackages } = require('./../../packages');

// TODO: mocking git

describe.skip('getChangedPackages >', () => {
  test('if target branch is not defined, it returns getChangedPackagesSinceDevelop ', async () => {});
  test('if target branch is not defined, it returns getChangedPackagesSinceMaster ', async () => {});
  test('if target branch is master, it returns getChangedPackagesSinceMaster ', async () => {});
  test('if target branch is develop, it returns getChangedPackagesSinceDevelop ', async () => {});
  test('if target branch is not defined but branch startsWith release-candidate/, it returns getChangedPackagesSinceMaster ', async () => {});
  test('if target branch is defined but branch startsWith release-candidate/, it returns getChangedPackagesSinceMaster ', async () => {});
  test('if parent is undefined it should return getChangedPackagesSinceMaster', async () => {});
});
