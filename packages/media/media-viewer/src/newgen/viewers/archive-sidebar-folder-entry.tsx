import * as React from 'react';
import { ZipEntry } from 'zipizape';
import { MediaType } from '@atlaskit/media-client';
import ChevronDown from '@atlaskit/icon/glyph/chevron-down';
import { MediaTypeIcon } from '../media-type-icon';
import {
  ArchiveSidebarFolderHeader,
  ArchiveSidebarFolderWrapper,
  ArchiveSidebarFileEntry,
  ArchiveSidebarEntryLabel,
} from '../styled';

import { ArchiveSidebarArchiveEntry } from './archive-sidebar-archive-entry';

export interface ArchiveSidebarFolderEntryProps {
  root: string;
  entries: ZipEntry[];
  onEntrySelected: (selectedEntry: ZipEntry) => void;
  isDefaultOpen?: boolean;
  hideHeader?: boolean;
  name?: string;
}

export interface ArchiveSidebarFolderEntryState {
  isOpen: boolean;
}

const isDirectChild = (root: string, entry: ZipEntry) => {
  return (
    entry.name.startsWith(root) &&
    entry.name.replace(root, '').match(/^[^/]+\/?$/g)
  );
};

const formatName = (root: string, name: string) => {
  return name.replace(root, '');
};

export class ArchiveSidebarFolderEntry extends React.Component<
  ArchiveSidebarFolderEntryProps
> {
  state: ArchiveSidebarFolderEntryState = {
    isOpen: this.props.isDefaultOpen || false,
  };

  toggleOpen = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  onEntryClick = (entry: ZipEntry) => () => {
    const { onEntrySelected } = this.props;

    onEntrySelected(entry);
  };

  renderEntry = (entry: ZipEntry) => {
    const { root, entries, onEntrySelected } = this.props;

    if (entry.isFolder) {
      return (
        <ArchiveSidebarFolderEntry
          key={entry.name}
          root={entry.name}
          name={formatName(root, entry.name)}
          entries={entries}
          onEntrySelected={onEntrySelected}
        />
      );
    }

    if (entry.mimeType === 'application/zip') {
      return (
        <ArchiveSidebarArchiveEntry
          key={entry.name}
          entry={entry}
          name={formatName(root, entry.name)}
          onEntrySelected={onEntrySelected}
        />
      );
    }

    return (
      <ArchiveSidebarFileEntry
        key={entry.name}
        onClick={this.onEntryClick(entry)}
      >
        <MediaTypeIcon type={entry.type as MediaType} />
        <ArchiveSidebarEntryLabel>
          {formatName(root, entry.name)}
        </ArchiveSidebarEntryLabel>
      </ArchiveSidebarFileEntry>
    );
  };

  render() {
    const { isOpen } = this.state;
    const { root, entries, name, hideHeader } = this.props;

    const entriesContent = isOpen
      ? entries
          .filter(entry => isDirectChild(root, entry))
          .map(this.renderEntry)
      : null;
    return (
      <React.Fragment>
        {!hideHeader ? (
          <ArchiveSidebarFolderHeader isOpen={isOpen} onClick={this.toggleOpen}>
            <ChevronDown
              css={{ backgroundColor: 'red' }}
              label="folder"
              size="large"
            />
            {name || root}
          </ArchiveSidebarFolderHeader>
        ) : null}
        <ArchiveSidebarFolderWrapper>
          {entriesContent}
        </ArchiveSidebarFolderWrapper>
      </React.Fragment>
    );
  }
}
