import { satisfies, coerce } from 'semver';
import { prompt } from '../../../utils/console';

export async function compareVersions(
  packageName: string,
  oldVersion: string,
  newVersion: string,
) {
  if (coerce(oldVersion) === coerce(newVersion)) {
    return new Error(`Package '${packageName}' is up-to-date (${newVersion}).`);
  }

  if (satisfies) {
    // if (satisfies(newVersion, oldVersion)) {
    if (
      !(await prompt(
        `"${packageName}@${newVersion}" satisfies current version "${oldVersion}", continue updating?: `,
      ))
    ) {
      return Promise.reject(0);
    }
  }

  return true;
}
