import * as React from 'react';

import { ResultsGroup } from '../../model/Result';
import { ScreenCounter } from '../../util/ScreenCounter';
import { ReferralContextIdentifiers } from '../GlobalQuickSearchWrapper';
import NoRecentActivity from '../NoRecentActivity';
import { isEmpty } from '../SearchResultsUtil';

import ResultGroupsComponent, {
  ResultGroupType,
} from './ResultGroupsComponent';
import { PreQueryAnalyticsComponent } from './ScreenAnalyticsHelper';

export interface Props {
  resultsGroups: ResultsGroup[];
  searchSessionId: string;
  screenCounter?: ScreenCounter;
  referralContextIdentifiers?: ReferralContextIdentifiers;
  renderNoRecentActivity: () => JSX.Element;
  renderAdvancedSearchGroup: (analyticsData?: any) => JSX.Element;
}

export default class PreQueryState extends React.Component<Props> {
  render() {
    const {
      resultsGroups,
      searchSessionId,
      screenCounter,
      renderNoRecentActivity,
      referralContextIdentifiers,
      renderAdvancedSearchGroup,
    } = this.props;

    if (resultsGroups.every(({ items }) => isEmpty(items))) {
      return (
        <>
          <PreQueryAnalyticsComponent
            key="pre-query-analytics"
            screenCounter={screenCounter}
            searchSessionId={searchSessionId}
            referralContextIdentifiers={referralContextIdentifiers}
          />
          <NoRecentActivity key="no-recent-activity">
            {renderNoRecentActivity()}
          </NoRecentActivity>
        </>
      );
    }

    return (
      <ResultGroupsComponent
        key="prequery-results-groups"
        type={ResultGroupType.PreQuery}
        renderAdvancedSearch={renderAdvancedSearchGroup}
        resultsGroups={resultsGroups}
        searchSessionId={searchSessionId}
        screenCounter={screenCounter}
        referralContextIdentifiers={referralContextIdentifiers}
        onShowMoreClicked={() => {}}
        query=""
      />
    );
  }
}
