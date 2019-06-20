import * as React from 'react';
import Textfield from '@atlaskit/textfield';

import InlineEdit from './InlineEdit';
import ReadViewContainer from '../styled/ReadViewContainer';
import { InlineEditableTextfieldProps } from '../types';

class InlineEditableTextfield extends React.Component<
  InlineEditableTextfieldProps,
  {}
> {
  static defaultProps = {
    isCompact: false,
  };

  render() {
    const { defaultValue, isCompact, placeholder } = this.props;
    return (
      <InlineEdit
        {...this.props}
        defaultValue={defaultValue}
        editView={fieldProps => (
          <Textfield {...fieldProps} isCompact={isCompact} autoFocus />
        )}
        readView={() => (
          <ReadViewContainer isCompact={isCompact}>
            {defaultValue || placeholder}
          </ReadViewContainer>
        )}
      />
    );
  }
}

export default InlineEditableTextfield;
