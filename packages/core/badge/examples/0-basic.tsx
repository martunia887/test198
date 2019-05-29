import * as React from 'react';
import styled from 'styled-components';
import { borderRadius } from '@atlaskit/theme/constants';
import { B400, N0, B500, N20 } from '@atlaskit/theme/colors';
import Badge from '../src';

interface ItemProps {
  inverted?: boolean;
}

const Item = styled.div`
  align-items: center;
  background: ${(props: ItemProps) => (props.inverted ? B400 : 'none')};
  border-radius: ${borderRadius}px;
  color: ${(props: ItemProps) => (props.inverted ? N0 : 'inherit')};
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
  max-width: 300px;
  padding: 0.6em 1em;

  &:hover {
    background-color: ${(props: ItemProps) => (props.inverted ? B500 : N20)};
  }
`;

export default function Example() {
  return (
    <div>
      <Item>
        <p>Added</p>
        <Badge appearance="added" max={99}>
          {3000}
        </Badge>
      </Item>
      <Item>
        <p>Default</p>
        <Badge>{5}</Badge>
      </Item>
      <Item>
        <p>Default (∞)</p>
        <Badge max={Infinity}>{Infinity}</Badge>
      </Item>
      <Item>
        <p>Important</p>
        <Badge appearance="important">{25}</Badge>
      </Item>
      <Item>
        <p>Primary</p>
        <Badge appearance="primary">{-5}</Badge>
      </Item>
      <Item inverted>
        <p>Primary Inverted</p>
        <Badge appearance="primaryInverted">{5}</Badge>
      </Item>
      <Item>
        <p>Removed</p>
        <Badge appearance="removed">{100}</Badge>
      </Item>
      <Item>
        <p>Added code</p>
        <Badge appearance="added">+100</Badge>
      </Item>
      <Item>
        <p>Removed code</p>
        <Badge appearance="removed">-100</Badge>
      </Item>
      <Item>
        <p>Added</p>
        <Badge appearance="added" max={4000}>
          {3000}
        </Badge>
      </Item>
    </div>
  );
}
