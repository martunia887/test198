import * as url from 'url';
import {
  MentionDescription,
  MentionResource,
} from '@atlaskit/mention/resource';
import { createPromise } from '../cross-platform-promise';
import { mockFetchFor } from './utils';

export async function createMentionProvider() {
  try {
    const {
      baseUrl,
      cloudId,
      productId = 'micros-group/confluence',
    } = await createPromise('getConfig').submit();
    let serviceUrl = url.resolve(baseUrl, `mentions/`);

    if (typeof cloudId === 'string') {
      serviceUrl = url.resolve(serviceUrl, `${cloudId}/`);
    }

    if (window.webkit) {
      mockFetchFor([serviceUrl]);
    }

    const accountIdResponse = await createPromise('getAccountId').submit();
    const accountId = selectAccountId(accountIdResponse);

    return new MentionResource({
      url: serviceUrl,
      productId,
      shouldHighlightMention: (mention: MentionDescription) => {
        if (accountId === mention.id) {
          return true;
        }
        return false;
      },
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(
      `Could not construct a MentionProvider, the following exception occurred:`,
      err,
    );
    return new MentionResource({ url: 'http://' });
  }
}

function selectAccountId(input: unknown): string {
  const hasAccountId = (input: object): input is { accountId: unknown } =>
    input.hasOwnProperty('accountId');

  switch (typeof input) {
    case 'string':
      return input;
    case 'object':
      if (
        input !== null &&
        input.hasOwnProperty('accountId') &&
        hasAccountId(input) &&
        typeof input.accountId === 'string'
      ) {
        return input.accountId;
      }
  }

  throw new Error(
    `Could not select accountId, string | { acountId: string } required but received ${JSON.stringify(
      input,
    )}`,
  );
}
