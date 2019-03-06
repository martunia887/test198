import * as React from 'react';
import { md, code, Example, Props } from '@atlaskit/docs';

export default md`
  This package includes common components and utilities used by other media packages.

  It exports two componets:

  - BlockCard
  - InlineCard

  Each of them expose the list of sub-views:

  - Resolving
  - Forbidden
  - Unauthorised
  - Errored
  - Resolved

  ## Usage

  ### InlineCard

  ${code`import {
    InlineCardResolvedView,
    InlineCardResolvingView,
    InlineCardErroredView,
    InlineCardForbiddenView,
    InlineCardUnauthorizedView,
  } from '@atlaskit/media-ui';`}

  ### BlockCard

  ${code`import {
    BlockCardResolvingView,
    BlockCardErroredView,
    BlockCardUnauthorisedView,
    BlockCardForbiddenView,
    BlockCardResolvedView,
  } from '@atlaskit/media-ui';`}

    ${(
      <Example
        Component={require('../examples/inline-card-view').default}
        title="Inline Card View"
        source={require('!!raw-loader!../examples/inline-card-view')}
      />
    )}

    ${(
      <Props
        heading="LinkView Props"
        props={require('!!extract-react-types-loader!../LinkView')}
      />
    )}

    ${(
      <Props
        heading="InlineCard ResolvingView Props"
        props={require('!!extract-react-types-loader!../InlineCard/ResolvingView')}
      />
    )}

    ${(
      <Props
        heading="InlineCard ResolvedView Props"
        props={require('!!extract-react-types-loader!../InlineCard/ResolvedView')}
      />
    )}

    ${(
      <Props
        heading="InlineCard ErroredView Props"
        props={require('!!extract-react-types-loader!../InlineCard/ErroredView')}
      />
    )}

    ${(
      <Props
        heading="InlineCard ForbiddenView Props"
        props={require('!!extract-react-types-loader!../InlineCard/ForbiddenView')}
      />
    )}

    ${(
      <Props
        heading="InlineCard Frame Props"
        props={require('!!extract-react-types-loader!../InlineCard/Frame')}
      />
    )}

    ${(
      <Props
        heading="InlineCard UnauthorisedView Props"
        props={require('!!extract-react-types-loader!../InlineCard/UnauthorisedView')}
      />
    )}

    ${(
      <Props
        heading="BlockCard ResolvingView Props"
        props={require('!!extract-react-types-loader!../BlockCard/ResolvingView')}
      />
    )}

    ${(
      <Props
        heading="BlockCard ResolvedView Props"
        props={require('!!extract-react-types-loader!../BlockCard/ResolvedView')}
      />
    )}

    ${(
      <Props
        heading="BlockCard ErroredView Props"
        props={require('!!extract-react-types-loader!../BlockCard/ErroredView')}
      />
    )}

    ${(
      <Props
        heading="BlockCard ForbiddenView Props"
        props={require('!!extract-react-types-loader!../BlockCard/ForbiddenView')}
      />
    )}

    ${(
      <Props
        heading="BlockCard UnauthorisedView Props"
        props={require('!!extract-react-types-loader!../BlockCard/UnauthorisedView')}
      />
    )}
    

`;
// TODO: Add props for each subviews using Props from extract react-type
