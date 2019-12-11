import * as React from 'react';
import { ZipEntry } from 'zipizape';

import { MediaType } from '@atlaskit/media-client';
import ChevronDown from '@atlaskit/icon/glyph/chevron-down';
import ChevronRight from '@atlaskit/icon/glyph/chevron-right';
import { MediaTypeIcon } from '../media-type-icon';
import {
  ArchiveSidebarFolderHeader,
  ArchiveSidebarFolderWrapper,
  ArchiveSidebarFileEntry,
  ArchiveSidebarEntryLabel,
} from '../styled';

export interface ArchiveSidebarFolderEntryProps {
  root: string;
  entries: ZipEntry[];
  onEntrySelected: Function;
  isDefaultOpen?: boolean;
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

  render() {
    const { isOpen } = this.state;
    const { root, onEntrySelected, entries, name } = this.props;

    const entriesContent = isOpen
      ? entries
          .filter(entry => isDirectChild(root, entry))
          .map(entry =>
            entry.isFolder ? (
              <ArchiveSidebarFolderEntry
                key={entry.name}
                root={entry.name}
                name={formatName(root, entry.name)}
                entries={entries}
                onEntrySelected={onEntrySelected}
              />
            ) : (
              <ArchiveSidebarFileEntry
                key={entry.name}
                onClick={onEntrySelected(entries, entry)}
              >
                <MediaTypeIcon type={entry.type as MediaType} />
                <ArchiveSidebarEntryLabel>
                  {formatName(root, entry.name)}
                </ArchiveSidebarEntryLabel>
              </ArchiveSidebarFileEntry>
            ),
          )
      : null;
    return (
      <React.Fragment>
        {root != '' ? (
          <ArchiveSidebarFolderHeader onClick={this.toggleOpen}>
            {isOpen ? (
              <ChevronDown label="folder" size="large" />
            ) : (
              <ChevronRight label="folder" size="large" />
            )}

            <ArchiveSidebarEntryLabel>{name || root}</ArchiveSidebarEntryLabel>
          </ArchiveSidebarFolderHeader>
        ) : null}
        <ArchiveSidebarFolderWrapper>
          {entriesContent}
        </ArchiveSidebarFolderWrapper>
      </React.Fragment>
    );
  }
}
