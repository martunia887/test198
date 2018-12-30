import { changelogCommand } from '../../changelog';
import { prompt } from '../../../utils/console';

export async function showChangelog(
  packageName: string,
  currentVersion: string,
  latestVersion: string,
) {
  if (
    !(await prompt(
      `Would you like to see the changelog for "${packageName}" between ${currentVersion} and ${latestVersion}?`,
    ))
  ) {
    return;
  }

  return changelogCommand(packageName, currentVersion, latestVersion);
}
