import { satisfies } from 'semver';
import { Log } from './get-changelog';

export function getUpdated(logs: Log[], currentVersion: string): string[] {
  return Array.from(
    new Set(
      logs
        .filter(
          log =>
            satisfies(log.version, `>${currentVersion}`) && log.updated.length,
        )
        .reduce(
          (acc, cur) => {
            acc = acc.concat(cur.updated);
            return acc;
          },
          [] as string[],
        ),
    ).values(),
  ) as string[];
}
