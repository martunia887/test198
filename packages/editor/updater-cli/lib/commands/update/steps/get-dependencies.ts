import * as ora from 'ora';
import chalk from 'chalk';
import { dependenciesGraph } from '../../../utils/npm';

export async function getDependencies(packageName: string, newVersion: string) {
  const spinner = ora(`Getting dependencies of "${packageName}"`).start();
  const packageDependencies = await dependenciesGraph(
    packageName,
    newVersion,
    1,
  );

  spinner.text += chalk.dim(` [${packageDependencies.length}]`);
  spinner.succeed();
  return packageDependencies;
}
