import * as React from 'react';
import Label from '@atlaskit/label';
import { components, ControlProps } from '@atlaskit/select';
import styled from 'styled-components';

const ControlWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 8px 8px;
`;

export class PopupControl extends React.PureComponent<ControlProps<any>> {
  render() {
    const {
      selectProps: { popupTitle },
    } = this.props;

    return (
      <ControlWrapper>
        <Label>{popupTitle}</Label>
        <components.Control {...this.props} />
      </ControlWrapper>
    );
  }
}
