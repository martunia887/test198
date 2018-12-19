import { resolveToCwd, exists, readFile } from './fs';

export async function isPackageJsonExist() {}

export async function loadPackageJson() {
  const packageJsonPath = resolveToCwd('package.json');
  if (await exists(packageJsonPath)) {
    return JSON.parse(await readFile(packageJsonPath, 'utf8'));
  }
  return {};
}

export function getPackageVersion(packageJson: any, packageName: string) {
  if (
    (packageJson.dependencies && packageJson.dependencies[packageName]) ||
    (packageJson.devDependencies && packageJson.devDependencies[packageName])
  ) {
    return packageJson.dependencies[packageName];
  }
}
