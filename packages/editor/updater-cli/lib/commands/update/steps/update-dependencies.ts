import * as ora from 'ora';
import chalk from 'chalk';
import { prompt } from '../../../utils/console';
import { updatePackageJson } from '../../../utils/package-json';
import { yarn, deduplicate } from '../../../utils/yarn';
import { resolveToCwd } from '../../../utils/fs';

function printDeps(title: string, deps: any) {
  if (!Object.keys(deps).length) {
    return;
  }

  console.log(`    ${title}`);
  // @ts-ignore
  Object.entries(deps).forEach(([name, versions]) => {
    console.log(`      ${name}: ${versions[0]} -> ${versions[1]}`);
  });
  console.log();
}

export async function updateDependencies(
  packageJsonPath: string,
  commonDeps: any,
  packageDeps: any,
) {
  console.log(chalk.yellow('Updating dependencies:'));
  printDeps('Dependencies:', commonDeps.dependencies);
  printDeps('DevDependencies:', commonDeps.devDependencies);
  printDeps('PeerDependencies:', commonDeps.peerDependencies);

  if (!(await prompt(`Continue?: `))) {
    return Promise.reject(0);
  }

  const spinner = ora(
    `Updating dependencies: [${chalk.dim('updating package.json...')}]`,
  ).start();
  await updatePackageJson(packageJsonPath, commonDeps);

  spinner.text = `Updating dependencies: [${chalk.dim('Running yarn...')}]`;
  await yarn();

  spinner.text = `Updating dependencies: [${chalk.dim(
    'Deduplucating yarn.lock...',
  )}]`;

  deduplicate(resolveToCwd('yarn.lock'), packageDeps.map((pkg: any) => pkg[0]));

  spinner.succeed();
  return;
}
