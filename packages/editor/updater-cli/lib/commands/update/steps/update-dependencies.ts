import * as ora from 'ora';
import chalk from 'chalk';
import { diff, coerce } from 'semver';
import { prompt } from '../../../utils/console';
import { updatePackageJson } from '../../../utils/package-json';
import { yarn, deduplicate } from '../../../utils/yarn';
import { resolveToCwd } from '../../../utils/fs';

import { getChangelog } from '../../changelog/steps/get-changelog';
import { getLogDetails } from '../../changelog/steps/get-log-details';

async function printDeps(title: string, deps: any) {
  if (!Object.keys(deps).length) {
    return;
  }

  console.log(`    ${title}`);
  // @ts-ignore
  const dependencies = Object.entries(deps);
  for (let i = 0; i < dependencies.length; i++) {
    const [name, versions] = dependencies[i];
    console.log(`      ${name}: ${versions[0]} -> ${versions[1]}`);

    if (
      diff(coerce(versions[0])!.version, coerce(versions[1])!.version) ===
      'major'
    ) {
      const logs = await getChangelog(name, versions[0], versions[1], false);
      const { majorChanges } = await getLogDetails(logs, versions[0]);

      console.log(
        chalk.bold(chalk.yellow('        💥 Breaking Changes (major)')),
      );
      majorChanges.split('\n').forEach(str => console.log(`        ${str}`));
      console.log();
    }
  }
  console.log();
}

export async function updateDependencies(
  packageJsonPath: string,
  commonDeps: any,
  packageDeps: any,
) {
  console.log(chalk.yellow('Updating dependencies:'));
  await printDeps('Dependencies:', commonDeps.dependencies);
  await printDeps('DevDependencies:', commonDeps.devDependencies);
  await printDeps('PeerDependencies:', commonDeps.peerDependencies);

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
