/**
 * In order to enable mentions in Editor we must set both properties: allowMentions and mentionProvider.
 * So this type is supposed to be a stub version of mention provider. We don't actually need it.
 */
import {
  MentionDescription,
  MentionResource,
} from '@atlaskit/mention/resource';
import { createPromise } from '../cross-platform-promise';

async function createMentionProvider() {
  try {
    const accountIdResponse = await createPromise('getAccountId').submit();

    const accountId =
      typeof accountIdResponse === 'string'
        ? accountIdResponse
        : accountIdResponse.accountId;

    return new MentionResource({
      // Required attrib. Requests will happen natively.
      url: 'http://',
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
