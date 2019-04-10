import { mount } from 'enzyme';
import * as React from 'react';
import PrefetchedResultsProvider, {
  GlobalSearchPreFetchContext,
} from '../../components/PrefetchedResultsProvider';

import {
  // @ts-ignore (additional export from mocked version)
  confluenceRecentItemsPromise,
  // @ts-ignore (additional export from mocked version)
  jiraRecentItemsPromise,
  // @ts-ignore (additional export from mocked version)
  abTestPromise,
  // @ts-ignore (additional export from mocked version)
  recentPeoplePromise,
  getConfluencePrefetchedData,
  getJiraPrefetchedData,
} from '../../api/prefetchResults';
import { QuickSearchContext } from '../../api/types';

jest.mock('../../api/prefetchResults');

describe('PrefetchedResultsProvider', () => {
  let prefetchedResultsHelper: jest.Mock;

  function mockPrefetchWithContext(context: QuickSearchContext) {
    return mount(
      <PrefetchedResultsProvider context={context} cloudId="cloudId">
        <GlobalSearchPreFetchContext.Consumer>
          {({ prefetchedResults }) => {
            prefetchedResultsHelper(prefetchedResults);
            return <div />;
          }}
        </GlobalSearchPreFetchContext.Consumer>
      </PrefetchedResultsProvider>,
    );
  }

  beforeEach(() => {
    prefetchedResultsHelper = jest.fn();
  });

  describe('common', () => {
    const contexts: {
      commonContext: QuickSearchContext;
      getFn: (_: any) => void;
      promise: Promise<any>;
    }[] = [
      {
        commonContext: 'jira',
        getFn: getJiraPrefetchedData,
        promise: jiraRecentItemsPromise,
      },
      {
        commonContext: 'confluence',
        getFn: getConfluencePrefetchedData,
        promise: confluenceRecentItemsPromise,
      },
    ];

    contexts.forEach(({ commonContext, getFn, promise }) => {
      it('should get ab test prefetch data', async () => {
        mockPrefetchWithContext(commonContext);
        await promise;

        expect(getFn).toHaveBeenCalled();
        expect(prefetchedResultsHelper.mock.calls[1][0].abTestPromise).toEqual(
          abTestPromise,
        );
      });

      it('should get recent people prefetch data', async () => {
        mockPrefetchWithContext(commonContext);
        await promise;

        expect(getFn).toHaveBeenCalled();
        expect(
          prefetchedResultsHelper.mock.calls[1][0].recentPeoplePromise,
        ).toEqual(recentPeoplePromise);
      });
    });
  });

  describe('confluence', () => {
    it('should get confluence prefetch data', async () => {
      mockPrefetchWithContext('confluence');
      await confluenceRecentItemsPromise;

      expect(getConfluencePrefetchedData).toHaveBeenCalled();
      expect(
        prefetchedResultsHelper.mock.calls[1][0].confluenceRecentItemsPromise,
      ).toEqual(confluenceRecentItemsPromise);
    });
  });

  describe('jira', () => {
    it('should get jira prefetch data', async () => {
      mockPrefetchWithContext('jira');
      await jiraRecentItemsPromise;

      expect(getJiraPrefetchedData).toHaveBeenCalled();
      expect(
        prefetchedResultsHelper.mock.calls[1][0].jiraRecentItemsPromise,
      ).toEqual(jiraRecentItemsPromise);
    });
  });
});
