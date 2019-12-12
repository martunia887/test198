import * as React from 'react';
import { ZipiZape, ZipEntry } from 'zipizape';
import { ArchiveSidebarFolderEntry } from './archive-sidebar-folder-entry';

export interface ArchiveSidebarArchiveEntryProps {
  entry: ZipEntry;
  onEntrySelected: (selectedEntry: ZipEntry) => void;
  name?: string;
}

export interface ArchiveSidebarArchiveEntryState {
  entries: ZipEntry[];
}

export const getArchiveFromEntry = async (
  entry: ZipEntry,
): Promise<ZipEntry[]> => {
  const zip = new ZipiZape();
  const content = await entry.getContent();
  return zip.readFile(content.blob as File);
};

export class ArchiveSidebarArchiveEntry extends React.Component<
  ArchiveSidebarArchiveEntryProps
> {
  state: ArchiveSidebarArchiveEntryState = {
    entries: [],
  };

  async componentDidMount() {
    const { entry } = this.props;

    this.setState({
      entries: await getArchiveFromEntry(entry),
    });
  }

  render() {
    const { entry, name, onEntrySelected } = this.props;
    const { entries } = this.state;

    return (
      <ArchiveSidebarFolderEntry
        root=""
        name={name || entry.name}
        entries={entries}
        onEntrySelected={onEntrySelected}
      />
    );
  }
}
