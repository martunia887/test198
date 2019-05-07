// @flow

module.exports = {
  // resolves from test to snapshot path
  resolveSnapshotPath: (testPath: any, snapshotExtension: any) => {
    console.log('testPath', testPath);
    // testPath.replace('__tests__', '__snapshots__') + snapshotExtension,
  },
};
