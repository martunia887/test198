import fetch from 'node-fetch';
import * as ora from 'ora';
import { coerce, SemVer } from 'semver';

export type Log = {
  version: SemVer;
  type: 'major' | 'minor' | 'patch';
  details: { link?: string; text: string }[];
  updated: string[];
};

function capitalize(str: string) {
  const [first, ...rest] = str.split('');
  return `${first.toLocaleUpperCase()}${rest.join('')}`;
}

const jiraRegex = /(^|\s)[a-zA-Z]+-\d{1,10}/g;
const isJiraTicket = (str: string) => str.match(jiraRegex);

function sortChanges(logs: Log[]) {
  return logs.sort((a, b) => {
    const aHas = a.details.some(d => !!d.link);
    const bHas = b.details.some(d => !!d.link);
    if (aHas === bHas) return 0;
    if (aHas && !bHas) return 1;
    return -1;
  });
}

function parseChangelog(raw: string): Log[] {
  const splitToken = `__CHANGELOG_SPLIT_${Date.now()}__`;
  return raw
    .replace(/[\n\r\s]## /g, `${splitToken}## `)
    .split(splitToken)
    .reduce(
      (all, log) => {
        const match = log.match(/\d+\.\d+\.\d+/);
        const v = match ? match[0] : null;
        if (!v) return all;

        const version = coerce(v);
        if (!version) return all;

        const isPatch = version.patch !== 0;
        const isMinor = version.minor !== 0 && !isPatch;
        const isMajor = version.major !== 0 && !isMinor && !isPatch;
        const type = isMajor ? 'major' : isMinor ? 'minor' : 'patch';

        const lines = log.split('\n');
        const details: { link?: string; text: string }[] = [];
        const updated: string[] = [];
        let isIndented = false;

        lines.forEach(line => {
          const text = line
            .trim()
            .replace(/^-(\s)?(\[(major|minor|patch)\])?/, '')
            .replace(
              /\[(.*?)\](\(https:\/\/bitbucket\.org\/atlassian\/atlaskit-mk-2\/commits\/\1\)):?/,
              '',
            )
            .trim();

          if (
            !(
              !text ||
              text.substr(0, 2) == '##' ||
              text.indexOf('Updated dependencies') !== -1
            )
          ) {
            if (line.substr(4, 10) === '@atlaskit/') {
              updated.push(line.substring(4, line.lastIndexOf('@')));
            } else {
              const match = isJiraTicket(text);
              const isList = line.trim().substr(0, 1) === '-';

              if (!isList) {
                isIndented = true;
              }

              if (match) {
                details.push({
                  link: match[0],
                  text: `${isIndented ? '  ' : ''}- ${capitalize(
                    text
                      .replace(jiraRegex, '')
                      .trim()
                      .replace(/^(:|-)?/, '')
                      .trim(),
                  )}`,
                });
              } else {
                details.push({
                  text: !isList ? `  ${text}` : `- ${capitalize(text)}`,
                });
              }
            }
          }
        });

        return all.concat({
          type,
          version,
          details,
          updated,
        });
      },
      [] as Log[],
    );
}

export async function getChangelog(
  packageName: string,
  currentVersion: string,
  version: string = 'latest',
) {
  const spinner = ora(
    `Getting changelogs for "${packageName}" from ${currentVersion} to ${version}.`,
  ).start();

  const res = await fetch(
    `https://unpkg.com/${packageName}@latest/CHANGELOG.md`,
  );
  if (res.status === 200) {
    const data = await res.text();
    const logs = sortChanges(parseChangelog(data));
    spinner.succeed();
    return logs;
  }

  spinner.fail(`Unable to fetch changelog for "${packageName}".`);
  throw new Error(`Unable to fetch changelog for "${packageName}".`);
}
