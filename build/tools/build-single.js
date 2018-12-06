const { execSync } = require('child_process');
const { getPackagesInfo } = require('@atlaskit/build-utils/tools');

/**
 * Runs a build for a single package if it does not have a local package.json build script.
 * Should be run from the root project dir.
 *
 * NOTE: Does NOT work for packages that have custom build steps. To run those, convert the
 * package to use its own scripts like navigation-next and make the custom build step a
 * postbuild script. Then run as `bolt workspace @atlaskit/xxx build` or cd into the pkg and
 * run `bolt build`
 */
(async () => {
  if (process.argv.length < 3) {
    console.log('Usage: build-single <package>');
    process.exit(1);
  }
  const pkgName = process.argv[2];

  const packages = await getPackagesInfo(process.cwd());
  const pkgInfo = packages.find(pkg => pkg.name === pkgName);

  let buildType;
  if (pkgInfo.isFlow) {
    buildType = 'flow';
  } else if (pkgInfo.isTypeScript) {
    buildType = 'ts';
  } else {
    console.error('Package is neither flow/ts, cannot be built');
    process.exit(2);
  }

  execSync(`./build/tools/root-command.js build ${pkgName} ${buildType}`, {
    stdio: 'inherit',
  });
})();
