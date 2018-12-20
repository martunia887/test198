import chalk from 'chalk';
import * as ora from 'ora';
import { getPackageVersion } from '../../../utils/package-json';

export async function getCurrent(packageName: string, packageJson: any) {
  const spinner = ora(
    `Getting info about the current version of "${packageName}"`,
  ).start();

  const packageVersion = getPackageVersion(packageJson, packageName);

  if (packageVersion) {
    spinner.text += chalk.dim(` [${packageVersion}]`);
    spinner.succeed();
    return packageVersion;
  }

  spinner.fail(
    `Package "${packageName}" is not listed in projects dependencies/devDependencies`,
  );
  throw new Error(
    `Package "${packageName}" is not listed in projects dependencies/devDependencies`,
  );
}
