import { resolveToCwd, exists } from '../../utils/fs';
import { loadPackageJson } from '../../utils/package-json';
import { getLatest } from './steps/get-latest';
import { getCurrent } from './steps/get-current';
import { compareVersions } from './steps/compare-version';
import { getDependencies } from './steps/get-dependencies';
import { getCommonDependencies } from './steps/get-common-dependencies';

export async function updateCommand(packageName: string) {
  const packageJsonPath = resolveToCwd('package.json');
  if (!(await exists(packageJsonPath))) {
    throw new Error('File "package.json" doesn\'t exist in current directory.');
  }
  const packageJson = await loadPackageJson(packageJsonPath);

  const latestVersion = await getLatest(packageName);
  const currentVersion = await getCurrent(packageName, packageJson);

  await compareVersions(packageName, currentVersion, latestVersion);

  const deps = await getDependencies(packageName, latestVersion);
  const commonDeps = getCommonDependencies(packageJson, deps);
  console.log(commonDeps);
}
