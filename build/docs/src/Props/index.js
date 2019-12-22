/* eslint-disable react/prop-types */
// @flow
import React from 'react';
import Button from '@atlaskit/button';
import ChevronDownIcon from '@atlaskit/icon/glyph/chevron-down';
import ChevronUpIcon from '@atlaskit/icon/glyph/chevron-up';
import PrettyProps from 'pretty-proptypes';

import components from './components';

// $FlowFixMe - Button issue
components.Button = ({ isCollapsed, ...rest }) => {
  return (
    <Button
      iconBefore={
        isCollapsed ? (
          <ChevronDownIcon label="expandIcon" />
        ) : (
          <ChevronUpIcon label="collapseIcon" />
        )
      }
      {...rest}
    />
  );
};

const Props = (props /*: Object */) => (
  <PrettyProps components={components} {...props} />
);

export default Props;
