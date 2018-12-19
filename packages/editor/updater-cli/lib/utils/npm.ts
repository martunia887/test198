import { exec } from 'child_process';
import { promisify } from 'util';

const pexec = promisify(exec);

export function latest(packageName: string) {
  return show(packageName, ['versions']).then(response => response.pop());
}

export function show(packageName: string, fields: Array<string>) {
  return pexec(`npm show ${packageName} ${fields.join(' ')} --json`).then(
    ({ stdout }) => JSON.parse(stdout),
  );
}
