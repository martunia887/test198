import { EmojiResource, EmojiResourceConfig } from '@atlaskit/emoji';
import { createPromise } from '../cross-platform-promise';
import { ElementsConfig, MediaAuthConfig } from '../types';

function createEmojiProvider() {
  return createPromise<ElementsConfig>('getConfig')
    .submit()
    .then(config => {
      let { cloudId, baseUrl } = config;

      baseUrl = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;

      const emojiConfig: EmojiResourceConfig = {
        providers: [
          {
            url: `${baseUrl}emoji/standard`,
          },
          {
            url: `${baseUrl}emoji/atlassian`,
          },
        ],
      };

      if (cloudId) {
        const customEmojiConfig = {
          url: `${baseUrl}emoji/${cloudId}/site`,
          refreshedSecurityProvider: () => {
            return createPromise<MediaAuthConfig>('getAuth')
              .submit()
              .then(auth => {
                if (auth && auth.token) {
                  return {
                    headers: { Authorization: `Bearer ${auth.token}` },
                  };
                }

                return {};
              });
          },
        };

        emojiConfig.providers.push(customEmojiConfig);
      }

      return new EmojiResource(emojiConfig);
    });
}

export default createEmojiProvider();
