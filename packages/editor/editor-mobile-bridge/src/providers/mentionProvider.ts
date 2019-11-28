import * as url from 'url';
import {
  MentionDescription,
  MentionResource,
} from '@atlaskit/mention/resource';
import { createPromise } from '../cross-platform-promise';
import { mockFetchFor } from './utils';

async function createMentionProvider() {
  try {
    const { baseUrl, cloudId, productId } = await createPromise(
      'getConfig',
    ).submit();
    let serviceUrl = url.resolve(baseUrl, `mentions/`);

    if (typeof cloudId === 'string') {
      serviceUrl = url.resolve(serviceUrl, `${cloudId}/`);
    }

    if (window.webkit) {
      mockFetchFor([serviceUrl]);
    }

    const accountIdResponse = await createPromise('getAccountId').submit();

    const accountId =
      typeof accountIdResponse === 'string'
        ? accountIdResponse
        : accountIdResponse.accountId;

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

export default createMentionProvider();
