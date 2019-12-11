import * as React from 'react';
import { ZipEntry } from 'zipizape';

export interface SidebarFolderEntryProps {
  root: string;
  entries: ZipEntry[];
  onEntrySelected: Function;
  isDefaultOpen?: boolean;
  name?: string;
}

export interface SidebarFolderEntryState {
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

export class SidebarFolderEntry extends React.Component<
  SidebarFolderEntryProps
> {
  state: SidebarFolderEntryState = {
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
              <SidebarFolderEntry
                key={entry.name}
                root={entry.name}
                name={formatName(root, entry.name)}
                entries={entries}
                onEntrySelected={onEntrySelected}
              >
                {formatName(root, entry.name)}
              </SidebarFolderEntry>
            ) : (
              <div key={entry.name} onClick={onEntrySelected(entries, entry)}>
                {formatName(root, entry.name)}
              </div>
            ),
          )
      : null;
    return (
      <div>
        <div onClick={this.toggleOpen}>{name || root}</div>
        {entriesContent}
      </div>
    );
  }
}
