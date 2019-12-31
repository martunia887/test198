import { AnalyticsContext } from '@atlaskit/analytics-next';
import isUndefined from 'lodash.isundefined';
import omitBy from 'lodash.omitby';
import React, { ReactNode } from 'react';

import { ContextualAnalyticsData } from '../../types';

export interface Props extends ContextualAnalyticsData {
  children: ReactNode;
}

export const extractContextualData = (props: ContextualAnalyticsData) => {
  const { sourceName, sourceType, ...rest } = props;
  const source =
    sourceName && sourceType ? `${sourceName}${sourceType}` : undefined;

  return omitBy(
    {
      source,
      ...rest,
    },
    isUndefined,
  );
};

export const ContextWrapper = (props: Props) => {
  const data = extractContextualData(props);

  return (
    <AnalyticsContext data={data}>
      <>{props.children}</>
    </AnalyticsContext>
  );
};
