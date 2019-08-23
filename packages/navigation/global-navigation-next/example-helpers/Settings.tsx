import React from 'react';
import { Settings } from '../src';

const drawerContent = () => <div>settings</div>;

const onDrawerCloseComplete = () => {
  console.log('settings close completed');
};

export const DefaultSettings = () => {
  const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);

  const onClick = React.useCallback(
    () => {
      setIsSettingsOpen(!isSettingsOpen);
    },
    [isSettingsOpen, setIsSettingsOpen],
  );

  const onClose = React.useCallback(
    () => {
      setIsSettingsOpen(false);
    },
    [setIsSettingsOpen],
  );

  return (
    <Settings
      drawerContent={drawerContent}
      isOpen={isSettingsOpen}
      onClick={onClick}
      onClose={onClose}
      onDrawerCloseComplete={onDrawerCloseComplete}
      tooltip="Settings"
    />
  );
};
