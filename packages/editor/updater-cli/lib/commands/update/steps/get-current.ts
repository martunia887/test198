import * as ora from 'ora';
import {
  loadPackageJson,
  getPackageVersion,
} from '../../../utils/package-json';

export async function getCurrent(packageName: string) {
  const spinner = ora(
    `Getting info about the current version of "${packageName}"`,
  ).start();

  try {
    const packageJson = await loadPackageJson();
    const packageVersion = getPackageVersion(packageJson, packageName);

    if (packageVersion) {
      spinner.succeed();
      return packageVersion;
    }

    spinner.fail(
      `Package "${packageName}" is not listed in projects dependencies/devDependencies`,
    );
    throw new Error(
      `Package "${packageName}" is not listed in projects dependencies/devDependencies`,
    );
  } catch (e) {
    spinner.fail('File `package.json` not found in current directory!');
    throw e;
  }
}
