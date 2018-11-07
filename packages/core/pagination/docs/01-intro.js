// @flow
import React from 'react';
import { md, Example, Props, code } from '@atlaskit/docs';

export default md`
A react component to render pagination as per ADG spec. It also exports a helper function which will help truncate the total number of pages and you can
use the \`Ellipsis\` component where needed to signify the skipped components.

${(
  <Example
    packageName="@atlaskit/pagination"
    Component={require('../examples/01-basic').default}
    title="Basic pagination"
    source={require('!!raw-loader!../examples/01-basic')}
  />
)}

## Installation

${code`
$ npm install @atlaskit/pagination
`}

## Usage

Pagination uses a [render props](https://reactjs.org/docs/render-props.html) pattern which helps you compose pagination.

Example API:

${code`
<Pagination>
  {( LeftNavigator, Page, RightNavigator ) => (
    <Fragement>
      <LeftNavigator />
      {
        [...Array(10)].map((_, index) => (
          <Page key={index}>{index + 1}</Page>
        ))
      }
      <RightNavigator />
    </Fragement>
  )}
</Pagination>
`}

## Components 

**LeftNavigator** -> This is meant to be used as left arrow in the start of pagination.

**Page** -> This is meant to be used as the button representing each Page.

**RightNavigator** -> This is meant to be used as right arrow in the end of pagination.

${(
  <Props
    props={require('!!extract-react-types-loader!../src/components/pagination')}
    heading="Pagination props"
  />
)}

${(
  <Props
    props={require('!!extract-react-types-loader!../src/components/page')}
    heading="Page props"
  />
)}

${(
  <Props
    props={require('!!extract-react-types-loader!../src/components/navigators/left-navigator')}
    heading="LeftNavigator props "
  />
)}

${(
  <Props
    props={require('!!extract-react-types-loader!../src/components/navigators/right-navigator')}
    heading="RightNavigator props "
  />
)}

`;
