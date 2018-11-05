// @flow
const {
  getChangedPackagesSinceMaster,
  getChangedPackagesSincePublishCommit,
} = require('../utils/packages');
const git = require('../utils/git');
const spawndamnit = require('spawndamnit');
const fse = require('fs-extra');
const path = require('path');

// To provide a quick fix, this function is shared with build-releases version command
// It should be abstracted into a single shared source, but I didn't feel quite right
// putting it in build-tools. TODO: Give this logic a shared home - BC
async function getNewFSChangesets(changesetBase) {
  if (!fse.existsSync(changesetBase)) {
    throw new Error('There is no .changeset directory in this project');
  }

  const dirs = fse.readdirSync(changesetBase);
  // this needs to support just not dealing with dirs that aren't set up properly
  const changesets = dirs
    .filter(file => fse.lstatSync(path.join(changesetBase, file)).isDirectory())
    .map(async changesetDir => {
      const summary = fse.readFileSync(
        path.join(changesetBase, changesetDir, 'changes.md'),
        'utf-8',
      );
      const jsonPath = path.join(changesetBase, changesetDir, 'changes.json');
      // $ExpectError - we are fine with dynamic require here
      const json = require(jsonPath);
      const commit = await git.getCommitThatAddsFile(jsonPath);
      return { ...json, summary, commit };
    });
  return Promise.all(changesets);
}

/**
 * This is a helper to run a script if a certaing package changed.
 * It works by returning a zero code if a tool should be run, so that the normal usage becomes:
 *
 * `node build/ci-scripts/run.if.package.changed @full/package-name -- yarn toolName`.
 * `node build/ci-scripts/run.if.package.changed @full/package-name @another/package-name -- yarn toolName`.
 */
(async () => {
  let cwd = process.cwd();
  let args = process.argv.slice(2);

  let dashdashIndex = args.indexOf('--');
  let command = args.slice(dashdashIndex + 1);
  let packageNames = args.slice(0, dashdashIndex);

  if (dashdashIndex < 0 || command.length === 0 || packageNames.length === 0) {
    console.error('Incorrect usage, run it like this:\n');
    console.error(
      '  $ node build/ci-scripts/run.if.package.changed.js [...packages] -- <...command>\n',
    );
    process.exit(1);
  }

  // Take packages that are going to be released,
  // because using only files is not enough in cases where packages is only dependent of other package
  let unpublishedChangesets = await getNewFSChangesets(
    path.join(cwd, '.changeset'),
  );
  let packagesToRelease = unpublishedChangesets
    .reduce(
      (acc, changeset) =>
        acc.concat(changeset.releases).concat(changeset.dependents),
      [],
    )
    .filter(change => change.type !== 'none');

  // Take changed files since a commit or master branch
  let branch = await git.getBranchName();
  let changedPackages =
    branch === 'master'
      ? await getChangedPackagesSincePublishCommit()
      : await getChangedPackagesSinceMaster();

  let matched = !!changedPackages
    .concat(packagesToRelease)
    .find(pkg => packageNames.includes(pkg.name));

  if (!matched) {
    process.exit(0);
  }

  try {
    let res = await spawndamnit(command[0], command.slice(1), {
      stdio: 'inherit',
      tty: (process.stdout && process.stdout.isTTY) || false,
    });

    throw process.exit(res.code);
  } catch (err) {
    if (err instanceof spawndamnit.ChildProcessError) {
      process.exit(err.code);
    } else {
      process.exit(1);
    }
  }
})();
