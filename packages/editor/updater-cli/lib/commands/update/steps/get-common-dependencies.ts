import * as ora from 'ora';
import { coerce, gt } from 'semver';

function shouldUpdateDep(oldVersion: string, newVersion: string) {
  return gt(coerce(newVersion)!, coerce(oldVersion)!);
}

export function getCommonDependencies(
  packageJson: any,
  packageName: string,
  newVersion: string,
  deps: any,
) {
  const spinner = ora(`Calculating common dependencies`).start();
  const projectDeps = {
    dependencies: packageJson.dependencies || {},
    peerDependencies: packageJson.peerDependencies || {},
    devDependencies: packageJson.devDependencies || {},
  };

  let commonDeps: any = {
    dependencies: {},
    devDependencies: {},
    peerDependencies: {},
  };

  if (projectDeps.dependencies[packageName]) {
    commonDeps.dependencies[packageName] = [
      projectDeps.dependencies[packageName],
      newVersion,
    ];
  }
  if (projectDeps.devDependencies[packageName]) {
    commonDeps.devDependencies[packageName] = [
      projectDeps.devDependencies[packageName],
      newVersion,
    ];
  }
  if (projectDeps.peerDependencies[packageName]) {
    commonDeps.peerDependencies[packageName] = [
      projectDeps.peerDependencies[packageName],
      newVersion,
    ];
  }
  // @ts-ignore
  commonDeps = deps.reduce((acc: any, dep: any) => {
    if (
      projectDeps.dependencies[dep[0]] &&
      shouldUpdateDep(projectDeps.dependencies[dep[0]], dep[1])
    ) {
      acc.dependencies[dep[0]] = [projectDeps.dependencies[dep[0]], dep[1]];
    }
    if (
      projectDeps.devDependencies[dep[0]] &&
      shouldUpdateDep(projectDeps.devDependencies[dep[0]], dep[1])
    ) {
      acc.devDependencies[dep[0]] = [
        projectDeps.devDependencies[dep[0]],
        dep[1],
      ];
    }
    if (
      projectDeps.peerDependencies[dep[0]] &&
      coerce(dep[1]) !== coerce(projectDeps.peerDependencies[dep[0]])
    ) {
      acc.peerDependencies[dep[0]] = [
        projectDeps.peerDependencies[dep[0]],
        dep[1],
      ];
    }
    return acc;
  }, commonDeps);

  spinner.succeed();

  return commonDeps;
}
