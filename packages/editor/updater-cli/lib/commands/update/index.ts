import { resolveToCwd, exists } from '../../utils/fs';
import { getLatest } from './steps/get-latest';
import { getCurrent } from './steps/get-current';
import { compareVersions } from './steps/compare-version';
import { updatePackageVersion } from './steps/update-package-version';

export async function updateCommand(packageName: string) {
  const packageJsonPath = resolveToCwd('package.json');
  if (!(await exists(packageJsonPath))) {
    throw new Error('File "package.json" doesn\'t exist in current directory.');
  }
  const latestVersion = await getLatest(packageName);
  const currentVersion = await getCurrent(packageName);
  await compareVersions(packageName, currentVersion, latestVersion);
  await updatePackageVersion(packageName, currentVersion, latestVersion);
}
