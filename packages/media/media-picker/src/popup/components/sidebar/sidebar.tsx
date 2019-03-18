import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import UploadIcon from '@atlaskit/icon/glyph/upload';
import DropboxIcon from '@atlaskit/icon/glyph/dropbox';
import GoogleDriveIcon from '@atlaskit/icon/glyph/googledrive';
import { FormattedMessage } from 'react-intl';
import { messages } from '@atlaskit/media-ui';
import { State } from '../../domain';
import SidebarItem from './item/sidebarItem';
import GiphySidebarItem from './item/giphySidebarItem';
import { Wrapper, ServiceList, Separator, SeparatorLine } from './styled';
import { PopupPlugin } from 'src/components/types';

export interface SidebarStateProps {
  readonly selected: string;
  readonly plugins?: PopupPlugin[];
}

export type SidebarProps = SidebarStateProps;

export class StatelessSidebar extends Component<SidebarProps> {
  render() {
    const { selected } = this.props;

    return (
      <Wrapper>
        <ServiceList>
          <SidebarItem
            serviceName="upload"
            serviceFullName={<FormattedMessage {...messages.upload} />}
            isActive={selected === 'upload'}
          >
            <UploadIcon label="upload" />
          </SidebarItem>
          {this.getCloudPickingSidebarItems()}
        </ServiceList>
      </Wrapper>
    );
  }

  private getCloudPickingSidebarItems = () => {
    const { selected, plugins = [] } = this.props;
    const pluginItems = plugins.map(({ name, icon }) => {
      return (
        <SidebarItem
          key={name}
          serviceName={name}
          serviceFullName={name}
          isActive={selected === name}
        >
          {icon}
        </SidebarItem>
      );
    });
    console.log(pluginItems);
    return [
      <Separator key="seperator">
        <SeparatorLine />
      </Separator>,
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
      ...pluginItems,
    ];
  };
}

export default connect<SidebarStateProps, undefined, {}, State>(state => ({
  selected: state.view.service.name,
  plugins: state.plugins,
}))(StatelessSidebar);
