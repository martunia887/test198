import * as React from 'react';
import Button, { ButtonGroup } from '../src';
import NachosButtonTheme from './Nachos/NachosButtonTheme';
import AddIcon from '@atlaskit/icon/glyph/editor/add';
import MenuIcon from '@atlaskit/icon/glyph/menu';
import BellIcon from '@atlaskit/icon/glyph/notification';
import LightbulbIcon from '@atlaskit/icon/glyph/lightbulb-filled';
import BitbucketIcon from '@atlaskit/icon/glyph/bitbucket';
import MoreIcon from '@atlaskit/icon/glyph/editor/more';
import { Theme as ButtonTheme } from '../src/theme';
import TransparentButton from './Nachos/TransparentButton';
import RoundButton from './Nachos/RoundButton';

export default () => (
  <div style={{ margin: 16 }}>
    <h3 style={{ marginBottom: 8 }}>ADG Buttons</h3>
    <h6 style={{ marginBottom: 8 }}>Appearances</h6>
    <ButtonGroup>
      <Button iconBefore={<AddIcon />}>
        Default
      </Button>
      <Button appearance="primary">Primary</Button>
      <Button appearance="warning">Warning</Button>
      <Button appearance="danger">Danger</Button>
      <Button appearance="help">Help</Button>
      <Button appearance="subtle">Subtle</Button>
      <Button appearance="link">Link</Button>
      <Button appearance="subtle-link">Subtle Link</Button>
    </ButtonGroup>
    <h6 style={{ marginBottom: 8 }}>States</h6>
    <ButtonGroup>
      <Button isDisabled>Disabled</Button>
      <Button isLoading>Loading</Button>
    </ButtonGroup>

    <ButtonTheme.Provider value={NachosButtonTheme}>
      <h3 style={{ marginBottom: 8 }}>Nachos Buttons</h3>
      <h6 style={{ marginBottom: 8 }}>Appearances</h6>
      <ButtonGroup>
        <Button iconBefore={<AddIcon />}>
          Default
        </Button>
        <Button appearance="primary">Primary</Button>
        <Button appearance="warning">Warning</Button>
        <Button appearance="danger">Danger</Button>
        <Button appearance="help">Help</Button>
        <Button appearance="subtle">Subtle</Button>
        <Button appearance="link">Link</Button>
        <Button appearance="subtle-link">Subtle Link</Button>
      </ButtonGroup>
      <h6 style={{ marginBottom: 8 }}>States</h6>
      <ButtonGroup>
        <Button isDisabled>Disabled</Button>
        <Button isLoading>Loading</Button>
      </ButtonGroup>

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

    </ButtonTheme.Provider>
  </div>
);
