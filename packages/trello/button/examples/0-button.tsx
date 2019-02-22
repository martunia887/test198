import * as React from 'react';
import AkButton from '@atlaskit/button';
import NachosButton, { ButtonGroup } from '../src';
import AddIcon from '@atlaskit/icon/glyph/editor/add';
// import MenuIcon from '@atlaskit/icon/glyph/menu';
// import BellIcon from '@atlaskit/icon/glyph/notification';
// import LightbulbIcon from '@atlaskit/icon/glyph/lightbulb-filled';
// import BitbucketIcon from '@atlaskit/icon/glyph/bitbucket';
// import MoreIcon from '@atlaskit/icon/glyph/editor/more';
// import TransparentButton from './Nachos/TransparentButton';
// import RoundButton from './Nachos/RoundButton';

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
    {/*

      <h3 style={{ marginBottom: 8 }}>Nachos Transparent Header Buttons</h3>
      <div style={{ background: `url("https://trello-backgrounds.s3.amazonaws.com/SharedBackground/2560x1701/c8ab52d5f2f4372d17e75c4b71ae81de/photo-1549989476-69a92fa57c36")`, width: '100%', paddingBottom: '20px' }}>
        <header style={{ background: 'rgba(0,0,0,.35)', padding: '8px' }}>
          <ButtonGroup>
            <TransparentButton iconBefore={<MenuIcon />} />
            <TransparentButton iconBefore={<AddIcon />}>
              Button
            </TransparentButton>
            <TransparentButton appearance="subtle" iconBefore={<BitbucketIcon/>}>Subtle</TransparentButton>
            <TransparentButton appearance="danger" iconBefore={<BellIcon/>}/>
            <TransparentButton appearance="help" iconBefore={<LightbulbIcon />}/>
          </ButtonGroup>
        </header>
      </div>

      <h3 style={{ marginBottom: 8 }}>Rounded Icon Button</h3>
      <ButtonGroup>
        <RoundButton iconBefore={<MoreIcon />} />
        <RoundButton iconBefore={<MoreIcon />} appearance="subtle" />
      </ButtonGroup>

      */}
  </div>
);
