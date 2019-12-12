import * as React from 'react';
import dateformat from 'dateformat';
import filesize from 'filesize';
import CheckCircleIcon from '@atlaskit/icon/glyph/check-circle';

import {
  FolderViewerRow,
  FileMetadataGroup,
  FileIcon,
  FileName,
  FileCreateDate,
  FileSize,
  FolderViewerContent,
  SelectedFileIconWrapper,
} from './styled';

import { mapMimeTypeToIcon } from '../../../../popup/tools/mimeTypeToIcon';
import {
  JsonLdCollection,
  JsonLdData,
} from '../../../forge/types/types-json-ld';
import { SelectedItem } from '../../../../popup/domain';

const getDateString = (timestamp?: string) => {
  if (!timestamp) {
    return '';
  }
  const todayString = new Date().toDateString();
  const itemDate = new Date(timestamp);
  const itemDateString = itemDate.toDateString();
  return dateformat(
    itemDate,
    todayString === itemDateString ? 'H:MM TT' : 'd mmm yyyy',
  );
};
const fileSelected = (
  <SelectedFileIconWrapper>
    <CheckCircleIcon label="check" />
  </SelectedFileIconWrapper>
);

export interface FolderViewerProps {
  items: JsonLdCollection;
  selectedItems: SelectedItem[];
  onFolderClick: (id: string) => void;
  onFileClick: (id: string) => void;
}

export const FolderViewer = ({
  items: { data },
  selectedItems,
  onFolderClick,
  onFileClick,
}: FolderViewerProps) => {
  if (data.length === 0) {
    return null;
  }
  return (
    <FolderViewerContent>
      {data.map(item => {
        const icon = mapMimeTypeToIcon(item.fileFormat!);
        const selectedIds = selectedItems.map(i => i.id);
        const isSelected = selectedIds.indexOf(item.url) > -1;
        if (item['@type'] === 'Collection') {
          return (
            <Folder
              key={item.url}
              folder={item}
              icon={icon}
              onClick={onFolderClick}
            />
          );
        } else {
          return (
            <File
              key={item.url}
              isSelected={isSelected}
              file={item}
              icon={icon}
              onClick={onFileClick}
            />
          );
        }
      })}
    </FolderViewerContent>
  );
};

export interface FolderProps {
  folder: JsonLdData;
  icon: JSX.Element;
  onClick: (id: string) => void;
}
const Folder = ({ folder, icon, onClick }: FolderProps) => {
  return (
    <FolderViewerRow onClick={() => onClick(folder.url)} key={folder.url}>
      <FileMetadataGroup>
        <FileIcon>{icon}</FileIcon>
        <FileName>{folder.name}</FileName>
      </FileMetadataGroup>
    </FolderViewerRow>
  );
};

export interface FileProps {
  isSelected: boolean;
  file: JsonLdData;
  icon: JSX.Element;
  onClick: (id: string) => void;
}
const File = ({ isSelected, file, icon, onClick }: FileProps) => {
  return (
    <FolderViewerRow
      isSelected={isSelected}
      onClick={() => onClick(file.url)}
      key={file.url}
    >
      <FileMetadataGroup>
        <FileIcon>{icon}</FileIcon>
        <FileName isSelected={isSelected}>{file.name}</FileName>
      </FileMetadataGroup>
      {isSelected ? (
        fileSelected
      ) : (
        <FileMetadataGroup>
          <FileCreateDate>{getDateString(file.dateCreated)}</FileCreateDate>
          <FileSize>{file.fileSize && filesize(file.fileSize)}</FileSize>
        </FileMetadataGroup>
      )}
    </FolderViewerRow>
  );
};

// /**
//  * Routing class that displays view depending on situation.
//  */
// export class FolderViewer extends Component<FolderViewerProps, {}> {
//   render(): JSX.Element {
//     return (
//       <FolderViewerWrapper>
//         <Navigation />
//         {this.renderContents()}
//       </FolderViewerWrapper>
//     );
//   }

//   private renderContents = () => {
//     if (this.isPageInitialLoading) {
//       return (
//         <SpinnerWrapper>
//           <Spinner size="large" />
//         </SpinnerWrapper>
//       );
//     }

//     return this.renderFolderContent(this.props.items);
//   };

//   private get isPageInitialLoading() {
//     return this.props.isLoading && !this.props.currentCursor;
//   }

//   private get isPageMoreLoading() {
//     return this.props.isLoading && this.props.currentCursor;
//   }

//   private renderFolderContent(items: ServiceFolderItem[]): JSX.Element | null {
//     if (!items) {
//       return null;
//     }

//     const folderItems = items
//       .filter(
//         item => item.mimeType.indexOf('application/vnd.google-apps.') === -1,
//       )
//       .map(item => {
//         const itemIcon = mapMimeTypeToIcon(item.mimeType);
//         const availableIds = this.props.selectedItems.map(
//           selectedItem => selectedItem.id,
//         );
//         const isSelected = availableIds.indexOf(item.id) > -1;

//         if (isServiceFile(item)) {
//           return this.renderServiceFile(item, itemIcon, isSelected);
//         } else {
//           return this.renderServiceFolder(item, itemIcon);
//         }
//       });

//     return (
//       <FolderViewerContent>
//         {[folderItems, this.renderLoadMoreButton()]}
//       </FolderViewerContent>
//     );
//   }

//   private renderServiceFolder = (
//     item: ServiceFolder,
//     itemIcon: JSX.Element,
//   ): JSX.Element => {
//     return (
//       <FolderViewerRow onClick={this.itemClicked(item)} key={item.id}>
//         <FileMetadataGroup>
//           <FileIcon>{itemIcon}</FileIcon>
//           <FileName>{item.name}</FileName>
//         </FileMetadataGroup>
//       </FolderViewerRow>
//     );
//   };

//   private renderServiceFile = (
//     serviceFile: ServiceFile,
//     itemIcon: JSX.Element,
//     isSelected: boolean,
//   ): JSX.Element => {
//     const tail = isSelected
//       ? fileSelected
//       : this.renderFileCreateDateAndSize(serviceFile);

//     return (
//       <FolderViewerRow
//         isSelected={isSelected}
//         onClick={this.itemClicked(serviceFile)}
//         key={serviceFile.id}
//       >
//         <FileMetadataGroup>
//           <FileIcon>{itemIcon}</FileIcon>
//           <FileName isSelected={isSelected}>{serviceFile.name}</FileName>
//         </FileMetadataGroup>
//         {tail}
//       </FolderViewerRow>
//     );
//   };

//   private renderFileCreateDateAndSize = ({ date, size }: ServiceFile) => {
//     return (
//       <FileMetadataGroup>
//         <FileCreateDate>{getDateString(date)}</FileCreateDate>
//         <FileSize>{filesize(size)}</FileSize>
//       </FileMetadataGroup>
//     );
//   };

//   private renderLoadMoreButton(): JSX.Element | null {
//     const { nextCursor, isLoading } = this.props;

//     if (nextCursor || this.isPageMoreLoading) {
//       const label = isLoading ? 'Loading...' : 'Load more';
//       return (
//         // Key is required as this component is used in array
//         <MoreBtnWrapper key="load-more-button-wrapper">
//           <AkButton
//             className="moreBtn"
//             onClick={this.onLoadMoreButtonClick}
//             isDisabled={isLoading}
//           >
//             {label}
//           </AkButton>
//         </MoreBtnWrapper>
//       );
//     } else {
//       return null;
//     }
//   }

//   private onLoadMoreButtonClick = (): void => {
//     const {
//       service,
//       path,
//       nextCursor,
//       isLoading,
//       onLoadMoreClick,
//     } = this.props;
//     if (!isLoading) {
//       onLoadMoreClick(service.name, service.accountId, path, nextCursor || '');
//     }
//   };

//   private itemClicked(item: ServiceFolderItem): () => void {
//     return () => {
//       const { service, onFolderClick, onFileClick } = this.props;
//       if (isServiceFolder(item)) {
//         const path = this.props.path.slice();
//         path.push({ id: item.id, name: item.name });
//         onFolderClick(service.name, service.accountId, path);
//       } else {
//         const file: ServiceFile = {
//           ...item,
//         };
//         onFileClick(service.name, service.accountId, file);
//       }
//     };
//   }
// }
