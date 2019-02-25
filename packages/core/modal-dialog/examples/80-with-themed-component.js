// @flow

import React, { Component } from 'react';
import { ThemeProvider } from 'styled-components';
import AkButton, { ButtonGroup } from '@atlaskit/button';
import NachosButton from '@nachos/button';
import ModalDialog from '../src';

const options = [
  { label: 'Adelaide', value: 'adelaide' },
  { label: 'Brisbane', value: 'brisbane' },
  { label: 'Canberra', value: 'canberra' },
  { label: 'Darwin', value: 'darwin' },
  { label: 'Hobart', value: 'hobart' },
  { label: 'Melbourne', value: 'melbourne' },
  { label: 'Perth', value: 'perth' },
  { label: 'Sydney', value: 'sydney' },
];

const onChange = console.log;
const defaults = { options, placeholder: 'Choose a City', onChange };

function onClose() {
  console.log('the "onClose" handler is fired');
}

export default class ModalWithThemedComponent extends Component<{}> {
  render() {
    return (
      <ThemeProvider theme={{}}>
        <ModalDialog onClose={onClose}>
          <ButtonGroup>
            <AkButton appearance="primary">Primary</AkButton>
            <AkButton appearance="warning">Warning</AkButton>
            <AkButton appearance="danger">Danger</AkButton>
            <AkButton appearance="help">Help</AkButton>
            <AkButton appearance="subtle">Subtle</AkButton>
            <AkButton appearance="link">Link</AkButton>
            <AkButton appearance="subtle-link">Subtle Link</AkButton>
          </ButtonGroup>
          <h6 style={{ marginBottom: 8 }}>States</h6>
          <ButtonGroup>
            <AkButton isDisabled>Disabled</AkButton>
            <AkButton isLoading>Loading</AkButton>
          </ButtonGroup>

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
      </ThemeProvider>
    );
  }
}
