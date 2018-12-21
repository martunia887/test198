import { readFile, writeFile } from './fs';

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

export async function updatePackageJson(packageJsonPath: string, deps: any) {
  const update = (
    packageJson: any,
    type: 'dependencies' | 'devDependencies' | 'peerDependencies',
    dep: any,
    version: any,
  ) => {
    packageJson[type][dep] = version[1];
  };

  const packageJson = await loadPackageJson(packageJsonPath);

  // @ts-ignore
  Object.entries(deps.dependencies).forEach(([name, versions]) => {
    update(packageJson, 'dependencies', name, versions);
  });
  // @ts-ignore
  Object.entries(deps.devDependencies).forEach(([name, versions]) => {
    update(packageJson, 'devDependencies', name, versions);
  });
  // @ts-ignore
  Object.entries(deps.peerDependencies).forEach(([name, versions]) => {
    update(packageJson, 'peerDependencies', name, versions);
  });

  return await writeFile(
    packageJsonPath,
    JSON.stringify(packageJson, null, 4),
    'utf8',
  );
}
