import { Pact } from '@pact-foundation/pact';
import { mount } from 'enzyme';
import * as React from 'react';
import { GlobalQuickSearch } from '../..';
import { makeCrossProductSearchData } from '../../../example-helpers/mockData';
import path from 'path';
import LocaleIntlProvider from '../../../example-helpers/LocaleIntlProvider';
import { HTTPMethod } from '@pact-foundation/pact/common/request';
import QuickSearchContainer, {
  Props as QuickSearchContainerProps,
} from '../../../src/components/common/QuickSearchContainer';

const port = 8989;
const provider = new Pact({
  port,
  log: path.resolve(process.cwd(), 'logs', 'mockserver-integration.log'),
  dir: path.resolve(process.cwd(), 'build/pacts'),
  spec: 2,
  cors: true,
  pactfileWriteMode: 'update',
  consumer: 'global-search',
  provider: 'xpsearch-aggregator',
});

describe('The API', () => {
  const url = `http://localhost:${port}`;

  beforeAll(async () => {
    await provider.setup();
  });

  beforeEach(async () => {
    await provider.verify();
  });

  afterAll(async () => {
    await provider.finalize();
  });

  describe('GlobalQuickSearch', () => {
    beforeEach(async () => {
      const interaction = {
        uponReceiving: 'quick search',
        withRequest: {
          method: HTTPMethod.POST,
          path: '/quicksearch/v1',
          headers: {
            Accept: '*/*',
          },
        },
        willRespondWith: {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
          },
          body: makeCrossProductSearchData(),
        },
        state: 'default',
      };
      return provider.addInteraction(interaction);
    });

    it('Should call the quick search API', async done => {
      const wrapper = mount(
        <LocaleIntlProvider locale="en">
          <GlobalQuickSearch
            cloudId="cloudId"
            context="confluence"
            searchAggregatorServiceUrl={url}
            referralContextIdentifiers={{
              currentContentId: '123',
              currentContainerId: '456',
              searchReferrerId: '123',
            }}
          />
        </LocaleIntlProvider>,
      );

      const quickSearchContainer = wrapper.find(QuickSearchContainer);
      const searchResults = await (quickSearchContainer.props() as QuickSearchContainerProps).getSearchResults(
        'query',
        'searchSessionId',
        100,
        0,
      );

      expect(searchResults.results.objects.length).toEqual(100);

      done();
    });
  });
});
