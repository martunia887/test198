import chalk from 'chalk';
import link from 'terminal-link';
import { satisfies } from 'semver';

import { Log } from './get-changelog';

function printLogDetails(log: Log) {
  return log.details
    .reduce(
      (acc, detail) => {
        if (detail.link) {
          acc.push(
            chalk.white('   ' + md(detail.text)) +
              chalk.dim(
                link(
                  ` [${detail.link}]`,
                  `https://product-fabric.atlassian.net/browse/${detail.link}`,
                ),
              ),
          );
        } else {
          acc.push(chalk.white('  ' + md(detail.text)));
        }

        return acc;
      },
      [] as any[],
    )
    .join('\n');
}

function md(str: string) {
  const bold = /(\*\*|__)(.*?)\1/g;
  return str.replace(bold, chalk.bold('$2'));
}

export function getLogDetails(changelogs: Log[], currentVersion: string) {
  const logs = changelogs.filter(
    log => satisfies(log.version, `>${currentVersion}`) && log.details.length,
  );

  const majorChanges = logs
    .filter(log => log.type === 'major')
    .map(printLogDetails)
    .join('\n');
  const minorChanges = logs
    .filter(log => log.type === 'minor')
    .map(printLogDetails)
    .join('\n');
  const patchChanges = logs
    .filter(log => log.type === 'patch')
    .map(printLogDetails)
    .join('\n');

  return {
    majorChanges,
    minorChanges,
    patchChanges,
  };
}
