/**
 * This script is used in CI to check if the current build is for a PR and if so returns the destination
 * branch of that PR. This is used during landkid builds to know which branch landkid should rebase on
 * (as this may not always be master)
 *
 * Requirements:
 *   Expects the $BITBUCKET_COMMIT variable to be set (Pipelines does this)
 *   Expects the $BITBUCKET_REPO_FULL_NAME variable to be set (Pipelines does this)
 *
 * Output:
 *  On success will only output the name of the branch, i.e: issue/PTC-2673-user-picker-ie11
 *  On error will output an error message and exit with non-zero exit code
 */

const axios = require('axios');
const DEBUG = false; // NOTE: Turning this on will make the script output intermediate information
// which will actually cause anything using this to break. This flag should
// only be used for debugging

const { BITBUCKET_COMMIT, BITBUCKET_REPO_FULL_NAME } = process.env;

const debugLog = DEBUG ? console.log : () => {};

const axiosRequestConfig = {
  params: {
    // get the most recent builds first
    sort: '-created_on',
    // and only PRs that are open
    state: 'OPEN',
  },
};

if (!BITBUCKET_COMMIT || !BITBUCKET_REPO_FULL_NAME) {
  console.error(
    `Expected $BITBUCKET_COMMIT and $BITBUCKET_REPO_FULL_NAME variables to be set but they were not found`,
  );
  console.error('Exiting');
  process.exit(1);
}

async function getAllPrs() {
  const pullRequests = [];
  // We add these to the URL manually because BB will return them back to us in the `next` field, duplicating them
  // if we pass them as actual params to axios each time.
  // We sort descending to on created_on to get neweset first and only look at open PRs
  const queryParams = '?sort=-created_on&state=OPEN';
  let endpoint = `https://api.bitbucket.org/2.0/repositories/${BITBUCKET_REPO_FULL_NAME}/pullrequests/${queryParams}`;
  let response;

  do {
    debugLog('Fetching', endpoint);
    response = await axios.get(endpoint);
    pullRequests.push(...response.data.values);
    debugLog(`Have ${pullRequests.length}/${response.data.size} PRs`);
    endpoint = response.data.next;
  } while (response.data.next);

  debugLog('Fetched', pullRequests.length, 'builds');
  return pullRequests;
}

async function main() {
  const allPRs = useCache ? cachedPRs : await getAllPrs();
  const matchingPr = allPRs
    // external PRs wont have a source commit, we can exclude those
    .filter(pr => pr.source && pr.source.commit && pr.source.commit.hash)
    .find(pr => BITBUCKET_COMMIT.startsWith(pr.source.commit.hash));
  if (!matchingPr) {
    console.error(`Error: No PR found for commit ${BITBUCKET_COMMIT}`);
    process.exit(1);
  }
  console.log(matchingPr.source.branch.name);
}

main();
