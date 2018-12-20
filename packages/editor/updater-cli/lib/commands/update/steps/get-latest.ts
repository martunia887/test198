import * as ora from 'ora';
import { latest } from '../../../utils/npm';
import chalk from 'chalk';

export async function getLatest(packageName: string) {
  const spinner = ora(
    `Getting info about the latest version of "${packageName}"`,
  ).start();
  const version = await latest(packageName);
  spinner.text += chalk.dim(` [${version}]`);
  spinner.succeed();
  return version;
}
