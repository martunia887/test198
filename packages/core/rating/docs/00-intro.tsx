import React from 'react';
import { md, Example, Props, DevPreviewWarning } from '@atlaskit/docs';

export default md`
${(<DevPreviewWarning />)}

${(
  <Example
    packageName="@atlaskit/rating"
    Component={require('../examples/star-rating').default}
    title="Star rating"
    source={require('!!raw-loader!../examples/star-rating')}
  />
)}

## Rating

This is primary control component for rating -
you will need to use this for any rating selection.
Compose this with \`<Star />\` or \`<RatingItem />\`.

### Props

${(
  <Props
    heading=""
    props={require('!!extract-react-types-loader!../src/components/rating')}
  />
)}

## Star

Out of the box star component that is composed from \`<RatingItem />\`.

${(
  <Example
    packageName="@atlaskit/rating"
    Component={require('../examples/uncontrolled').default}
    title="Composing with star"
    source={require('!!raw-loader!../examples/uncontrolled')}
  />
)}

### Props

${(
  <Props
    heading=""
    props={require('!!extract-react-types-loader!../src/components/star-type')}
  />
)}

## Rating Item

Rating item component that is highly customizable.

${(
  <Example
    packageName="@atlaskit/rating"
    Component={require('../examples/custom-rating').default}
    title="Composing with rating item"
    source={require('!!raw-loader!../examples/custom-rating')}
  />
)}

### Props

${(
  <Props
    heading=""
    props={require('!!extract-react-types-loader!../src/components/rating-item-type')}
  />
)}
`;
