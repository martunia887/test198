import { createCommand } from '../../runner';
import { loadPackageJsonTask } from '../common-tasks/load-package-json';
import { projectChecksTask } from '../common-tasks/project-checks';

import { getVersionsTask } from './tasks/get-versions';
import { showChangelogTask } from './tasks/show-changelogs';
import { ChangeLogTasksCtx, ChangeLogTasksParams } from './types';

const changeLogTasks = createCommand<ChangeLogTasksCtx, ChangeLogTasksParams>([
  projectChecksTask,
  loadPackageJsonTask,
  getVersionsTask,
  showChangelogTask,
]);

export async function changelogCommand(
  packageName: string,
  currentVersion: string = '',
) {
  return changeLogTasks({ packageName, currentVersion });
}
