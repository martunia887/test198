#!/usr/bin/env node

const { promisify } = require('util');
const path = require('path');
const os = require('os');
const globby = require('globby');
const meow = require('meow');
const fs = require('fs-extra');

const { spawn } = require('./spawn');

const cli = meow({
  help: `
  Usage:
    $ package-verify
  `,
});

async function run() {
  const cwd = process.cwd();

  const packagePaths = cli.input.length ? cli.input : [cwd];
  console.log(packagePaths);

  try {
    const runs = await Promise.all(
      packagePaths.map(async packagePath => {
        const packageExists = await exists(packagePath, ['package.json']);
        if (!packageExists) {
          return;
        }

        const pkg = fs.readJSONSync(path.join(packagePath, 'package.json'), {});
        return await verifyPackage(pkg, packagePath);
      }),
    );

    if (runs.filter(Boolean).length === 0) {
      cli.showHelp();
    }
  } catch (e) {
    console.log(e.message);
    process.exit(1);
  }
}

run();

async function verifyPackage(pkgConfig, cwd) {
  await spawn('npm', ['pack', pkgConfig.name], { cwd });

  const tmpdir = await promisify(fs.mkdtemp)(
    path.join(os.tmpdir(), 'bolt-package-verify-'),
  );

  const tarballs = await globby(`${cwd}/*.tgz`);
  await installDependencies(tmpdir, pkgConfig.peerDependencies, tarballs);

  /**
   * Run a couple of simple checks to ensure package.json exists
   * The main and module (if defined) field exists.
   */
  const files = ['package.json', pkgConfig.main];

  if (pkgConfig.module) {
    files.push(pkgConfig.module);
  }

  return await exists(path.join(tmpdir, 'node_modules', pkgConfig.name), files);
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
  await spawn('npm', ['install', ...peerDeps, `${tarball}`], {
    cwd,
  });

  // await spawn('open', [cwd]);
}

/**
 * Run a simple check to see if we can access certain files
 * TODO raise an error if not found.
 */
async function exists(base, files = []) {
  return await Promise.all(
    files.map(async file => {
      const absolutePath = path.join(base, file);
      // try {
      return await promisify(fs.access)(absolutePath);
      // } catch (e) {
      // return false;
      // }
    }),
  );
}
