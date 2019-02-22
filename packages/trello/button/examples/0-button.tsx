import * as React from 'react';
import AkButton from '@atlaskit/button';
import NachosButton, { ButtonGroup } from '../src';
import AddIcon from '@atlaskit/icon/glyph/editor/add';
import MoreIcon from '@atlaskit/icon/glyph/editor/more';
import RoundButton from './custom/rounded';

export default () => (
  <div style={{ margin: 16 }}>
    <h3 style={{ marginBottom: 8 }}>ADG Buttons</h3>
    <h6 style={{ marginBottom: 8 }}>Appearances</h6>
    <ButtonGroup>
      <AkButton iconBefore={<AddIcon />}>Default</AkButton>
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
      <NachosButton iconBefore={<AddIcon />}>Default</NachosButton>
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

    <h3 style={{ marginBottom: 8 }}>Rounded Icon Button</h3>
    <ButtonGroup>
      <RoundButton iconBefore={<MoreIcon />} />
      <RoundButton iconBefore={<MoreIcon />} appearance="subtle" />
    </ButtonGroup>
  </div>
);
