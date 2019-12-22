import { createPackageJsonPatch } from '../../../utils/package-json';
import { UpdateTask } from '../types';

export const getCommonDependenciesTask: UpdateTask = {
  title: 'Calculating dependencies that should be updated',
  async task(ctx) {
    ctx.packageJsonPatch = createPackageJsonPatch(ctx.packageJson, ctx.deps);
  },
};
