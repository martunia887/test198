import { readFile } from './fs';

export async function isPackageJsonExist() {}

export async function loadPackageJson(packageJsonPath: string) {
  return JSON.parse(await readFile(packageJsonPath, 'utf8'));
}

export function getPackageVersion(packageJson: any, packageName: string) {
  if (
    (packageJson.dependencies && packageJson.dependencies[packageName]) ||
    (packageJson.devDependencies && packageJson.devDependencies[packageName])
  ) {
    return packageJson.dependencies[packageName];
  }
}
