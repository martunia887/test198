import { exec } from 'child_process';
import { promisify } from 'util';

// @ts-ignore
import { fixDuplicates } from 'yarn-deduplicate';
import { readFile, writeFile } from './fs';

const pexec = promisify(exec);

export function yarn() {
  return pexec('yarn');
}

export async function loadYarnLock(yarnLockPath: string) {
  return await readFile(yarnLockPath, 'utf8');
}

export async function deduplicate(yarnLockPath: string, packages: any) {
  const yarnLock = await loadYarnLock(yarnLockPath);
  const dedupedYarnLock = fixDuplicates(yarnLock, {
    includePackages: packages,
  });
  return await writeFile(yarnLockPath, dedupedYarnLock);
}
