// @flow
import React from 'react';
import { md, Example, Props, code } from '@atlaskit/docs';

export default md`
  Spinners are used for showing a system process of unknown length going on
  that ends with the system displaying results to the user. The spinner
  animates in, as well as animating out when \`isCompleting\` is
  passed to it.

  The inverted spinner matches the dark spinner for display in non-dark
  contexts. In a dark context, the inverted spinner remains the same color.

  ## Usage

  ${code`import Spinner from '@atlaskit/spinner';`}

  ${(
    <Example
      packageName="@atlaskit/spinner"
      Component={require('../examples/0-basic-rendering').default}
      title="Basic"
      source={require('!!raw-loader!../examples/0-basic-rendering')}
    />
  )}

  Under ADG3, spinners have an outro animation. To ensure the outro animation is
  played correctly, you should not unmount the spinner until the \`onComplete()\`
  prop has been called.

  Below is an example of the quintessential way to use a spinner for loading.
  
  ${(
    <Example
      packageName="@atlaskit/spinner"
      Component={require('../examples/0-how-to-use-a-spinner').default}
      title="Animation Options"
      source={require('!!raw-loader!../examples/0-how-to-use-a-spinner')}
    />
  )}
 
  ${(
    <Props
      heading="Spinner Props"
      props={require('!!extract-react-types-loader!../src/Spinner')}
    />
  )}
`;
