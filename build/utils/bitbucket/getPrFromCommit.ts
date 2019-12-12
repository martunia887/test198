import https from 'https';
import { PaginatedPullRequests, PullRequest } from './types';

const { BITBUCKET_USER, BITBUCKET_PASSWORD } = process.env;

if (!BITBUCKET_USER || !BITBUCKET_PASSWORD) {
  throw Error(
    '$BITBUCKET_USER or $BITBUCKET_PASSWORD environment variables are not set',
  );
}

// We use the node https library so that we can run this script without installing any dependencies
// even though we have to add some extra wrapping functions
function httpGetRequest(url: string) {
  const auth = Buffer.from(`${BITBUCKET_USER}:${BITBUCKET_PASSWORD}`).toString(
    'base64',
  );
  const options = {
    headers: {
      Authorization: `Basic ${auth}`,
    },
  };
  return new Promise((resolve, reject) => {
    let data = '';

    const req = https.get(url, options, resp => {
      resp.on('data', chunk => (data += chunk));
      resp.on('end', () => resolve(JSON.parse(data)));
    });

    req.on('error', err => reject(err));
  });
}

/**
 * Retrieves an open PR containing `commitHash` as the top source commit, or `undefined` if none exist.
 * Will throw if more than one PR is found. Commit hash requires 12 chars minimum.
 */
export async function getPrFromCommit(
  commitHash: string,
  repoFullName: string,
  closedPrs: boolean = false,
) {
  if (!commitHash || !repoFullName) {
    throw Error('Missing commitHash or repoFullName');
  }

  // We sort descending on created_on to get newest first and only look at open PRs
  let endpoint:
    | string
    | undefined = `https://api.bitbucket.org/2.0/repositories/${repoFullName}/pullrequests?sort=-created_on&state=${
    closedPrs ? 'MERGED' : 'OPEN'
  }&pagelen=20`;
  let response: PaginatedPullRequests;
  let matchedPr: PullRequest | undefined;

  do {
    // TODO: TS 3.7 assertion
    if (!endpoint) {
      throw Error('Missing endpoint');
    }
    response = (await httpGetRequest(endpoint)) as PaginatedPullRequests;
    if (!response || !response.values) {
      throw Error(
        `Response is not in the format we expected. Received:\n${response}`,
      );
    }
    const foundPrs = closedPrs
      ? response.values.filter(
          pr => pr.merge_commit && commitHash.startsWith(pr.merge_commit.hash),
        )
      : response.values.filter(
          pr =>
            pr.source &&
            pr.source.commit &&
            pr.source.commit.hash &&
            commitHash.startsWith(pr.source.commit.hash),
        );
    if (foundPrs.length === 1) {
      matchedPr = foundPrs[0];
    } else if (foundPrs.length > 1) {
      throw Error(
        `Found multiple open PRs for commit ${commitHash}. PR ids: ${foundPrs.map(
          pr => pr.id,
        )}`,
      );
    }
    endpoint = response.next;
  } while (!matchedPr && response.next);

  return matchedPr;
}
