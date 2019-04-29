// @flow
import React from 'react';
import { md, Example, Props, code } from '@atlaskit/docs';
import SectionMessage from '@atlaskit/section-message';
import { Overview } from '@atlaskit/contentful';

export default md`
  ${(
    <SectionMessage appearance="warning">
      <p>
        <strong>
          The previous export of `AvatarGroup` has been moved to its own package
          `@atlaskit/avatar-group`.
        </strong>
      </p>
      <p>
        Please update your dependencies to use the @atlaskit/avatar-group
        package.
      </p>
    </SectionMessage>
  )}

  ${<Overview entryId="64oPjCWyt5peofx6Xs4Nmn" />}

  ## Usage

  ${code`import Avatar from '@atlaskit/avatar';`}

  ${(
    <Example
      packageName="@atlaskit/avatar"
      Component={require('../examples/01-basicAvatar').default}
      title="Avatar"
      source={require('!!raw-loader!../examples/01-basicAvatar')}
    />
  )}

  ${(
    <Props
      heading="Avatar Props"
      props={require('!!extract-react-types-loader!../src/components/Avatar')}
    />
  )}
`;
