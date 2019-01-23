// @flow

import React from 'react';
import DropdownMenu, { DropdownItemGroup, DropdownItem } from '../src';

export default () => (
  <div style={{ padding: '100px 40px' }}>
    <DropdownMenu
      trigger="Choices Choices Choices Choices Choices Choices Choices Choices Choices Choices Choices"
      triggerType="button"
      shouldFlip={false}
      position="right middle"
      onOpenChange={e => console.log('dropdown opened', e)}
      withDivider={true}
      triggerMaxWidth={400}
    >
      <DropdownItemGroup>
        <DropdownItem>Sydney</DropdownItem>
        <DropdownItem>Melbourne</DropdownItem>
      </DropdownItemGroup>
      <DropdownItemGroup>
        <DropdownItem>Mountain View</DropdownItem>
        <DropdownItem>San Francisco</DropdownItem>
      </DropdownItemGroup>
      <DropdownItemGroup>
        <DropdownItem>New York</DropdownItem>
        <DropdownItem>Austin</DropdownItem>
      </DropdownItemGroup>
    </DropdownMenu>
  </div>
);
