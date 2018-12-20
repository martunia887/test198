import * as ora from 'ora';
import { coerce } from 'semver';

export function getCommonDependencies(packageJson: any, deps: any) {
  const spinner = ora(`Calculating common dependencies`).start();
  const projectDeps = {
    dependencies: packageJson.dependencies || {},
    peerDependencies: packageJson.peerDependencies || {},
    devDependencies: packageJson.devDependencies || {},
  };

  // @ts-ignore
  const commonDeps = deps.reduce(
    (acc: any, dep: any) => {
      if (
        projectDeps.dependencies[dep[0]] &&
        coerce(dep[1]) !== coerce(projectDeps.dependencies[dep[0]])
      ) {
        acc.dependencies[dep[0]] = dep[1];
      }
      if (
        projectDeps.devDependencies[dep[0]] &&
        coerce(dep[1]) !== coerce(projectDeps.devDependencies[dep[0]])
      ) {
        acc.devDependencies[dep[0]] = dep[1];
      }
      if (
        projectDeps.peerDependencies[dep[0]] &&
        coerce(dep[1]) !== coerce(projectDeps.peerDependencies[dep[0]])
      ) {
        acc.peerDependencies[dep[0]] = dep[1];
      }
      return acc;
    },
    { dependencies: [], devDependencies: [], peerDependencies: [] },
  );

  spinner.succeed();

  return commonDeps;
}
