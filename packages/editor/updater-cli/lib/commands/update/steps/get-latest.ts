import * as ora from 'ora';
import { latest } from '../../../utils/npm';

export async function getLatest(packageName: string) {
  const spinner = ora(
    `Getting info about the latest version of "${packageName}"`,
  ).start();
  const version = await latest(packageName);

  spinner.succeed();

  return version;
}
