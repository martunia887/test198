import { exec } from 'child_process';
import { promisify } from 'util';
import * as semver from 'semver';

const pexec = promisify(exec);

export function latest(packageName: string) {
  return show(packageName, ['versions']).then(response => response.pop());
}

export function dependencies(
  packageName: string,
  version: string | null = 'latest',
) {
  return show(`${packageName}${version ? '@' + version : ''}`, [
    'dependencies',
    'devDependencies',
    'peerDependencies',
  ]);
}

export async function dependenciesGraph(
  packageName: string,
  version: string = 'latest',
  depth: number = 1,
) {
  function loadChildrenDeps(children: any, depth: number = 0) {
    return Promise.all(
      children.map((child: any) =>
        dependenciesGraph(child[0], child[1], depth),
      ),
    );
  }

  const rawDeps = await dependencies(
    packageName,
    (semver as any).coerce(version),
  );

  if (!rawDeps) {
    return [];
  }

  const deps = new Map([
    // @ts-ignore
    ...Object.entries(rawDeps.dependencies || {}),
    // @ts-ignore
    ...Object.entries(rawDeps.peerDependencies || {}),
  ]);

  if (depth > 0) {
    (await loadChildrenDeps(Array.from(deps.entries()), depth - 1)).forEach(
      (children: any) =>
        children.forEach((child: any) => deps.set(child[0], child[1])),
    );
  }

  return Array.from(deps.entries());
}

export function show(packageName: string, fields: Array<string>) {
  return pexec(`npm show ${packageName} ${fields.join(' ')} --json`).then(
    ({ stdout }) => {
      return stdout ? JSON.parse(stdout) : null;
    },
  );
}
