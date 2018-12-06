#!/usr/bin/env node

const bolt = require('bolt');
const { execSync } = require('child_process');

/**
 * Run a package-level command from the root
 */
(async () => {
  if (process.argv.length < 4) {
    console.log('Usage: root-command <command> <package> [...args]');
    process.exit(1);
  }

  const command = process.argv[2];
  const pkg = process.argv[3];
  const commandArgs = process.argv.slice(4);

  const workspaces = await bolt.getWorkspaces({ only: pkg });

  if (workspaces.length === 0) {
    console.log(`Could not find workspace with name '${pkg}'`);
    process.exit(2);
  }

  const packagePath = workspaces[0].dir;

  execSync(
    `../../../build/tools/command.sh ${command} ${commandArgs.join(' ')}`,
    { cwd: packagePath, stdio: 'inherit' },
  );
})();
