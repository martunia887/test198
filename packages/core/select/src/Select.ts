import Select from 'react-select';
import {
  withAnalyticsEvents,
  withAnalyticsContext,
  createAndFireEvent,
} from '@atlaskit/analytics-next';

import createSelect from './createSelect';
import { name as packageName, version as packageVersion } from './version.json';

export const SelectWithoutAnalytics = createSelect(Select);
const createAndFireEventOnAtlaskit = createAndFireEvent('atlaskit');

export default (withAnalyticsContext({
  componentName: 'select',
  packageName,
  packageVersion,
})(
  withAnalyticsEvents({
    onChange: createAndFireEventOnAtlaskit({
      action: 'changed',
      actionSubject: 'option',
      attributes: {
        componentName: 'select',
        packageName,
        packageVersion,
      },
    }),
  })(SelectWithoutAnalytics),
) as unknown) as ReturnType<typeof createSelect>;
