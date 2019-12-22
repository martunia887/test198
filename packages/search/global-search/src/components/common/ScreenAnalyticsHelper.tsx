import * as React from 'react';

import { ScreenCounter } from '../../util/ScreenCounter';
import { buildScreenEvent, Screen } from '../../util/analytics-util';
import { ReferralContextIdentifiers } from '../GlobalQuickSearchWrapper';
import AnalyticsEventFiredOnMount from '../analytics/AnalyticsEventFiredOnMount';

const getAnalyticsComponent = (
  subscreen: Screen,
  screenCounter: ScreenCounter | undefined,
  searchSessionId: string,
  analyticsKey: string,
  referralContextIdentifiers?: ReferralContextIdentifiers,
) =>
  screenCounter ? (
    <AnalyticsEventFiredOnMount
      key={analyticsKey}
      onEventFired={() => screenCounter.increment()}
      payloadProvider={() =>
        buildScreenEvent(
          subscreen,
          screenCounter.getCount(),
          searchSessionId,
          referralContextIdentifiers,
        )
      }
    />
  ) : null;

export const PreQueryAnalyticsComponent = ({
  screenCounter,
  searchSessionId,
  referralContextIdentifiers,
}: {
  screenCounter?: ScreenCounter;
  searchSessionId: string;
  referralContextIdentifiers?: ReferralContextIdentifiers;
}) =>
  getAnalyticsComponent(
    Screen.PRE_QUERY,
    screenCounter,
    searchSessionId,
    'preQueryScreenEvent',
    referralContextIdentifiers,
  );

export const PostQueryAnalyticsComponent = ({
  screenCounter,
  searchSessionId,
  referralContextIdentifiers,
}: {
  screenCounter?: ScreenCounter;
  searchSessionId: string;
  referralContextIdentifiers?: ReferralContextIdentifiers;
}) =>
  getAnalyticsComponent(
    Screen.POST_QUERY,
    screenCounter,
    searchSessionId,
    'postQueryScreenEvent',
    referralContextIdentifiers,
  );
