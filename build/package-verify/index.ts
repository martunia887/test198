import { promisify } from 'util';
import fs from 'fs';
import path from 'path';
import os from 'os';
import globby from 'globby';
import meow from 'meow';

// TOOD invert how bolt runs this.
import bolt from 'bolt';

import { spawn } from './spawn';

const cli = meow();

async function run() {
  try {
    const workspaces = await bolt.getWorkspaces();
    const packages = workspaces.filter(
      workspace => cli.input.indexOf(workspace.name) !== -1,
    );

    packages.forEach(async pkg => await verifyPackage(pkg));
  } catch (e) {
    // tslint:disable-next-line:no-console
    console.log(e.message);
    process.exit(1);
  }
}

run();

async function verifyPackage(pkg) {
  await bolt.workspaceExec({
    pkgName: pkg.name,
    command: 'npm',
    commandArgs: ['pack', pkg.name],
  });

  const tmpdir = await promisify(fs.mkdtemp)(
    path.join(os.tmpdir(), 'bolt-package-verify-'),
  );

  const tarballs = await globby(`${pkg.dir}/*.tgz`);
  await installDependencies(tmpdir, pkg.config.peerDependencies, tarballs);

  /**
   * Run a couple of simple checks to ensure package.json exists
   * The main and module (if defined) field exists.
   */
  const files: string[] = ['package.json', pkg.config.main];

  if (pkg.config.module) {
    files.push(pkg.config.module);
  }

  await exists(path.join(tmpdir, 'node_modules', pkg.name), files);
}

async function installDependencies(cwd, peerDependencies = [], tarballs = []) {
  if (tarballs.length !== 1) {
    return Promise.reject(
      `More than one tarball was found: ${JSON.stringify(tarballs)}`,
    );
  }

  const peerDeps = Object.keys(peerDependencies).map(
    dep => `${dep}@${peerDependencies[dep]}`,
  );
  // We should only have one tarball.
  // its only an array becuase of the globbing
  const tarball = tarballs[0];
  await spawn('npm', ['install', ...peerDeps, `file:${tarball}`], {
    cwd,
  });

  await spawn('npm', ['install'], { cwd });
}

/**
 * Run a simple check to see if we can access certain files
 * TODO raise an error if not found.
 */
async function exists(base, files: string[] = []) {
  await files.forEach(async file => {
    const absolutePath = path.join(base, file);
    try {
      await promisify(fs.access)(absolutePath);
      // tslint:disable-next-line:no-console
      console.log(`${absolutePath} exists!`);
    } catch (e) {
      // tslint:disable-next-line:no-console
      console.error(`${absolutePath} not found`);
    }
  });
}
