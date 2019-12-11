import * as React from 'react';
import { ZipEntry } from 'zipizape';
import { ArchiveSideBar } from '../styled';
import { SidebarFolderEntry } from './sidebarFolderEntry';

export interface ArchiveSidebarProps {
  entries: ZipEntry[];
  onEntrySelected: Function;
}

export class ArchiveSidebar extends React.Component<ArchiveSidebarProps> {
  render() {
    const { entries, onEntrySelected } = this.props;

    return (
      <ArchiveSideBar>
        <SidebarFolderEntry
          root=""
          name="/"
          entries={entries}
          onEntrySelected={onEntrySelected}
          isDefaultOpen
        />
      </ArchiveSideBar>
    );
  }
}
