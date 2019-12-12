import * as React from 'react';
import { ZipEntry } from 'zipizape';
import { ArchiveSideBar } from '../styled';
import { ArchiveSidebarFolderEntry } from './archive-sidebar-folder-entry';

export interface ArchiveSidebarProps {
  entries: ZipEntry[];
  onEntrySelected: (selectedEntry: ZipEntry) => void;
}

export class ArchiveSidebar extends React.Component<ArchiveSidebarProps> {
  render() {
    const { entries, onEntrySelected } = this.props;

    return (
      <ArchiveSideBar>
        <ArchiveSidebarFolderEntry
          root=""
          name="/"
          entries={entries}
          onEntrySelected={onEntrySelected}
          isDefaultOpen
          hideHeader
        />
      </ArchiveSideBar>
    );
  }
}
