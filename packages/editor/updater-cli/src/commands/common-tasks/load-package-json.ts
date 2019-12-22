import { Task } from '../../runner';
import { resolveToCwd } from '../../utils/fs';
import { loadPackageJson } from '../../utils/package-json';

export const loadPackageJsonTask: Task = {
  title: "Loading project's package.json",
  task: async ctx => {
    const packageJsonPath = resolveToCwd('package.json');
    ctx.packageJsonPath = packageJsonPath;
    ctx.packageJson = await loadPackageJson(packageJsonPath);
  },
};
