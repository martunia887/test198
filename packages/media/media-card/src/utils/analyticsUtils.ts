import { BaseAnalyticsContext } from '../index';
import { version, name } from '..link-2-package.json';

export const getBaseAnalyticsContext = (
  componentName: any,
  actionSubjectId: any,
): BaseAnalyticsContext => ({
  packageVersion: version,
  packageName: name,
  componentName,
  actionSubject: 'MediaCard',
  actionSubjectId,
});
