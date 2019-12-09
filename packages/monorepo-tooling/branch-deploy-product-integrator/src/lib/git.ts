/** Git utils */
import { SimpleGit } from 'simple-git/promise';

// Returns a boolean indicating if it committed or not
// Returns false when there are no changes to commit
export async function commitAndPush(
  git: SimpleGit,
  commitMessage: string,
  authorEmail: string,
  branchName: string,
): Promise<boolean> {
  await git.add(['./']);

  const status = await git.status();
  if (status && status.staged.length === 0) {
    console.log('Nothing to commit');
    return false;
  }

  await git.commit(commitMessage, [
    '--author',
    `BOT Atlaskit branch deploy integrator <${authorEmail}>`,
  ]);
  await git.push('origin', branchName);

  console.log('Committed and pushed changes');

  return true;
}

export async function checkoutOrCreate(git: SimpleGit, branchName: string) {
  let branchExists;

  try {
    await git.revparse(['--verify', `origin/${branchName}`]);
    branchExists = true;
  } catch (error) {
    branchExists = false;
  }

  if (branchExists) {
    console.log(`Pulling existing branch ${branchName}`);
    await git.checkout(branchName);
    await git.pull('origin', branchName);
  } else {
    console.log(`Checking out new branch ${branchName}`);
    await git.checkoutBranch(branchName, 'origin/master');
  }
}

export async function isInsideRepo(git: SimpleGit, repoName: string) {
  const remote = await git.listRemote(['--get-url']);

  return remote.indexOf(repoName) > -1;
}
