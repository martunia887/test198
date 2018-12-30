import chalk from 'chalk';
import { coerce } from 'semver';
import { resolveToCwd, exists } from '../../utils/fs';
import { loadPackageJson } from '../../utils/package-json';
import { getPackageVersion } from '../../utils/package-json';
import { getChangelog } from './steps/get-changelog';
import { getLogDetails } from './steps/get-log-details';
import { getUpdated } from './steps/get-updated';

export async function changelogCommand(
  packageName: string,
  currentVersion?: string,
  version: string = 'latest',
) {
  if (!currentVersion) {
    const packageJsonPath = resolveToCwd('package.json');
    if (!(await exists(packageJsonPath))) {
      throw new Error(
        'File "package.json" doesn\'t exist in current directory.',
      );
    }
    const packageJson = await loadPackageJson(packageJsonPath);
    currentVersion = coerce(getPackageVersion(packageJson, packageName))!
      .version;
  }

  const logs = await getChangelog(packageName, currentVersion!, version);
  const { majorChanges, minorChanges, patchChanges } = getLogDetails(
    logs,
    currentVersion!,
  );
  const updated = getUpdated(logs, currentVersion!);

  if (majorChanges) {
    console.log(chalk.bold(chalk.yellow('💥 Breaking Changes (major)')));
    console.log(majorChanges + '\n\n');
  }

  if (minorChanges) {
    console.log(chalk.bold(chalk.yellow('🚀 New Features (minor)')));
    console.log(minorChanges + '\n\n');
  }

  if (patchChanges) {
    console.log(chalk.bold(chalk.yellow('🐛 Bug Fixes (patch)')));
    console.log(patchChanges + '\n\n');
  }

  const noChanges = !majorChanges && !minorChanges && !patchChanges;
  if (noChanges && !updated.length) {
    console.log(
      `🧐 Looks like nothing changed! You're probably already on ${version} of "${packageName}".`,
    );
  } else if (noChanges && updated.length) {
    console.log(
      `👍 No changes were made in "${packageName}" between ${currentVersion} and ${version}. It has been bumped due to changes made in the following packages:`,
    );
    updated.forEach((pkg: string) => {
      console.log(chalk.bold(`  - ${pkg}`));
    });
  }
}
