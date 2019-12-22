import { createCommand } from '../../runner';
import { loadPackageJsonTask } from '../common-tasks/load-package-json';
import { projectChecksTask } from '../common-tasks/project-checks';

import { applyPreset } from './apply-preset';
import { commitChangedTask } from './tasks/commit-changes';
import { compareVersionsTask } from './tasks/compare-version';
import { getCommonDependenciesTask } from './tasks/get-common-dependencies';
import { getDependenciesTask } from './tasks/get-dependencies';
import { getVersionsTask } from './tasks/get-versions';
import { showDependenciesListTask } from './tasks/show-dependencies-list';
import { updateDependenciesTask } from './tasks/update-dependencies';
import { UpdateTaskParams, UpdateTaskCtx, UpdateTaskFlags } from './types';

const updateTasks = createCommand<UpdateTaskCtx, UpdateTaskParams>([
  projectChecksTask,
  loadPackageJsonTask,
  getVersionsTask,
  compareVersionsTask,
  getDependenciesTask,
  getCommonDependenciesTask,
  showDependenciesListTask,
  updateDependenciesTask,
  commitChangedTask,
]);

export async function updateCommand(
  packages: Array<string>,
  flags: UpdateTaskFlags,
) {
  return updateTasks({
    packages: packages.concat(applyPreset(flags.preset)),
    flags,
  });
}
