// @flow

import React, { Component } from 'react';
import AkButton, { ButtonGroup } from '@atlaskit/button';
import * as NachosButton from '@nachos/button';
import ModalDialog from '../src';

const onChange = console.log;

function onClose() {
  console.log('the "onClose" handler is fired');
}

console.log(NachosButton);
export default class ModalWithThemedComponent extends Component<{}> {
  render() {
    return (
      <ModalDialog onClose={onClose}>
        <h3 style={{ marginBottom: 8 }}>Nachos Buttons</h3>
        <h6 style={{ marginBottom: 8 }}>Appearances</h6>
        <ButtonGroup>
          <NachosButton appearance="primary">Primary</NachosButton>
          <NachosButton appearance="warning">Warning</NachosButton>
          <NachosButton appearance="danger">Danger</NachosButton>
          <NachosButton appearance="help">Help</NachosButton>
          <NachosButton appearance="subtle">Subtle</NachosButton>
          <NachosButton appearance="link">Link</NachosButton>
          <NachosButton appearance="subtle-link">Subtle Link</NachosButton>
        </ButtonGroup>
        <h6 style={{ marginBottom: 8 }}>States</h6>
        <ButtonGroup>
          <NachosButton isDisabled>Disabled</NachosButton>
          <NachosButton isLoading>Loading</NachosButton>
        </ButtonGroup>
      </ModalDialog>
    );
  }
}
