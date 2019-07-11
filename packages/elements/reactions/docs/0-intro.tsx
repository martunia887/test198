import * as React from 'react';
import {
  md,
  Example,
  Props,
  code,
  AtlassianInternalWarning,
} from '@atlaskit/docs';

import ReactionsExample from '../examples/00-picker-and-reactions';

const ReactionsSource = require('!!raw-loader!../examples/00-picker-and-reactions');

const ReactionsProps = require('!!extract-react-types-loader!../examples/examples-util/ReactionsExampleWrapper');

export default md`
  ${<AtlassianInternalWarning />}

  The main purpose of the Reactions component is to provide users the ability to react to pieces of content.

  ## Usage

  Import the component in your React app as follows:

  ${code`
  import { ReactionStore, ConnectedReactionsView } from '@atlaskit/reactions';
  import { EmojiResource } from '@atlaskit/emoji/resource';

  const emojiProvider = new EmojiResource({
    providers: [
      {
        url: 'https://emoji-example/emoji/standard',
      },
      {
        url: 'https://emoji-example/emoji/site-id/site',
        securityProvider: () => ({
          headers: {
            Authorization: 'Bearer token',
          },
        }),
      },
    ],
  });

  const demoAri = 'ari:cloud:owner:demo-cloud-id:item/1';
  const containerAri = 'ari:cloud:owner:demo-cloud-id:container/1';

  ReactDOM.render(
    <ReactionStore url="https://reactions-service">
      <ConnectedReactionsView
        containerAri={containerAri}
        ari={demoAri}
        emojiProvider={Promise.resolve(emojiProvider)}
      />
    </ReactionStore>,
    container,
  );
  };`}

  ### Note:

  Don't forget to add polyfills for fetch, ES6 & ES7 to your product build if you want to target older browsers.
  We recommend the use of [@babel/preset-env](https://www.npmjs.com/package/@babel/preset-env) & [core-js@3](https://github.com/zloirock/core-js/blob/master/docs/2019-03-19-core-js-3-babel-and-a-look-into-the-future.md)

  Key navigation can be bound to \`selectNext\` (e.g. down arrow),
  \`selectPrevious\` (e.g. up arrow), and \`chooseCurrentSelection\`
  (e.g. enter and tab).

  ${(
    <Example
      packageName="@atlaskit/reactions"
      Component={ReactionsExample}
      title="Picker and Reactions"
      source={ReactionsSource}
    />
  )}

  ${<Props props={ReactionsProps} />}

`;
