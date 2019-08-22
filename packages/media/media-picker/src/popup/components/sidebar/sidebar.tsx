import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import DropboxIcon from '@atlaskit/icon/glyph/dropbox';
import GoogleDriveIcon from '@atlaskit/icon/glyph/googledrive';
import RecentsIcon from '@atlaskit/icon/glyph/recent';
import { State, SelectedItem, Recents } from '../../domain';
import SidebarItem from './item/sidebarItem';
import GiphySidebarItem from './item/giphySidebarItem';
import {
  Wrapper,
  ServiceList,
  Separator,
  SeparatorLine,
  UploadButtonWrapper,
} from './styled';
import { Browser as BrowserComponent } from '../../../components/browser/browser';
import LocalBrowserButton from '../../../popup/components/views/upload/uploadButton';

export interface SidebarStaticProps {
  readonly browserRef?: React.RefObject<BrowserComponent>;
}

export interface SidebarStateProps {
  readonly selected: string;
  readonly selectedItems: SelectedItem[];
  readonly recents: Recents;
}

export type SidebarProps = SidebarStateProps & SidebarStaticProps;

export class StatelessSidebar extends Component<SidebarProps> {
  render() {
    const { browserRef, selectedItems, recents } = this.props;
    const isEmpty = recents.items.length === 0;
    const uploadButtonAppearance =
      isEmpty || selectedItems.length === 0 ? 'primary' : 'default';

    return (
      <Wrapper>
        <ServiceList>
          {browserRef ? (
            <UploadButtonWrapper>
              <LocalBrowserButton
                browserRef={browserRef}
                appearance={uploadButtonAppearance}
              />
            </UploadButtonWrapper>
          ) : null}
          {this.getCloudPickingSidebarItems()}
        </ServiceList>
      </Wrapper>
    );
  }

  private getCloudPickingSidebarItems = () => {
    const { selected } = this.props;
    return [
      <Separator key="seperator">
        <SeparatorLine />
      </Separator>,
      <SidebarItem
        key="upload"
        serviceName="upload"
        serviceFullName="Recents"
        isActive={selected === 'upload'}
      >
        <RecentsIcon label="recent files" />
      </SidebarItem>,
      <GiphySidebarItem key="giphy" isActive={selected === 'giphy'} />,
      <SidebarItem
        key="dropbox"
        serviceName="dropbox"
        serviceFullName="Dropbox"
        isActive={selected === 'dropbox'}
      >
        <DropboxIcon label="dropbox" />
      </SidebarItem>,
      <SidebarItem
        key="google"
        serviceName="google"
        serviceFullName="Google Drive"
        isActive={selected === 'google'}
      >
        <GoogleDriveIcon label="google" />
      </SidebarItem>,
    ];
  };
}

export default connect<SidebarStateProps, undefined, {}, State>(state => ({
  selected: state.view.service.name,
  selectedItems: state.selectedItems,
  recents: state.recents,
}))(StatelessSidebar);
