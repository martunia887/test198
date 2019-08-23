import { DropdownItem, DropdownItemGroup } from '@atlaskit/dropdown-menu';
import React, { Fragment } from 'react';

import { Help } from '../src';

const HelpContent = () => (
  <Fragment>
    <DropdownItemGroup title="Help">
      <DropdownItem>Atlassian Documentation</DropdownItem>
      <DropdownItem>Atlassian Community</DropdownItem>
      <DropdownItem>What's New</DropdownItem>
      <DropdownItem>Get Jira Mobile</DropdownItem>
      <DropdownItem>Keyboard shortcuts</DropdownItem>
      <DropdownItem>About Jira</DropdownItem>
    </DropdownItemGroup>
    <DropdownItemGroup title="Legal">
      <DropdownItem>Terms of use</DropdownItem>
      <DropdownItem>Privacy Policy</DropdownItem>
    </DropdownItemGroup>
  </Fragment>
);

export const DefaultHelp = () => {
  const [isHelpOpen, setIsHelpOpen] = React.useState(false);

  const onClick = React.useCallback(
    () => {
      setIsHelpOpen(!isHelpOpen);
    },
    [setIsHelpOpen, isHelpOpen],
  );

  const onClose = React.useCallback(
    () => {
      setIsHelpOpen(false);
    },
    [setIsHelpOpen],
  );

  return (
    <Help
      dropdownContent={HelpContent}
      isOpen={isHelpOpen}
      onClick={onClick}
      onClose={onClose}
      tooltip="Help"
    />
  );
};
