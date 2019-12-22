import { AutocompleteClient } from '../../../api/AutocompleteClient';
import { ConfluenceClient } from '../../../api/ConfluenceClient';
import { Result } from '../../../model/Result';
import { makeConfluenceObjectResult } from '../_test-util';

const EMPTY_PROMISE = () => Promise.resolve([]);

export const noResultsConfluenceClient: ConfluenceClient = {
  getRecentItems: EMPTY_PROMISE,
  getRecentSpaces: EMPTY_PROMISE,
};

export const makeConfluenceClient = (
  client: Partial<ConfluenceClient>,
): ConfluenceClient => {
  return {
    ...noResultsConfluenceClient,
    ...client,
  };
};

export function makeSingleResultQuickNavSearchResponse(
  result?: Result,
): Result[] {
  return [result || makeConfluenceObjectResult()];
}

export const mockAutocompleteClient: AutocompleteClient = {
  getAutocompleteSuggestions: EMPTY_PROMISE,
};
