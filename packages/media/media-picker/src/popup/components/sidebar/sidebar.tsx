import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import RecentIcon from '@atlaskit/icon/glyph/recent';
import UploadIcon from '@atlaskit/icon/glyph/upload';
import { FormattedMessage } from 'react-intl';
import { messages } from '@atlaskit/media-ui';
import { State } from '../../domain';
import SidebarItem from './item/sidebarItem';
import { Wrapper, ServiceList, Separator, SeparatorLine } from './styled';
import { MediaPickerPlugin } from '../../../domain/plugin';

export interface SidebarStateProps {
  readonly selected: string;
  readonly plugins?: MediaPickerPlugin[];
}

export type SidebarProps = SidebarStateProps;

export class StatelessSidebar extends Component<SidebarProps> {
  render() {
    const { selected } = this.props;

    return (
      <Wrapper>
        <ServiceList>
          <SidebarItem
            serviceName="activity"
            serviceFullName={
              <FormattedMessage
                {...{
                  id: 'fabric.media.activity',
                  defaultMessage: 'Activity',
                  description:
                    'Title of a section where we show recent activity for Media and Links.',
                }}
              />
            }
            isActive={selected === 'activity'}
          >
            <RecentIcon label="recent" />
          </SidebarItem>
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

    return [
      <Separator key="seperator">
        <SeparatorLine />
      </Separator>,
      ...pluginItems,
    ];
  };
}

export default connect<SidebarStateProps, undefined, {}, State>(state => ({
  selected: state.view.service.name,
  plugins: state.plugins,
}))(StatelessSidebar);
