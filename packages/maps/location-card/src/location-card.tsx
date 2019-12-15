import React from 'react';
import { InlineCardResolvedView } from '@atlaskit/media-ui';
import LocationIcon from '@atlaskit/icon/glyph/location';
import { Geolocation, locationsManager } from '@atlaskit/maps-core';
import { MapModal } from '@atlaskit/maps-viewer';

export type LocationCardProps = {
  location: Geolocation;
  // Viewer options
  shouldOpenMapsViewer?: boolean;
  targetMap?: string | false;
};

type LocationCardState = {
  isSelected: boolean;
};

export default class LocationCard extends React.Component<
  LocationCardProps,
  LocationCardState
> {
  static defaultProps = {
    shouldOpenMapsViewer: true,
    targetMap: 'global',
  };
  state: LocationCardState = {
    isSelected: false,
  };

  componentDidMount() {
    const { targetMap, location } = this.props;
    if (targetMap) {
      locationsManager.register(location, targetMap);
    }
  }

  componentDidUpdate(prevProps: LocationCardProps) {
    if (prevProps.location !== this.props.location) {
      if (prevProps.targetMap) {
        locationsManager.unRegister(prevProps.location, prevProps.targetMap);
      }
      if (this.props.targetMap) {
        locationsManager.register(this.props.location, this.props.targetMap);
      }
    }
  }

  componentWillUnmount() {
    const { location, targetMap } = this.props;
    if (targetMap) {
      locationsManager.unRegister(location, targetMap);
    }
  }

  setSelected = (isSelected: boolean) => {
    this.setState({ isSelected });
  };

  renderMapModal = () => {
    const { isSelected } = this.state;
    const { targetMap } = this.props;
    const locations = targetMap ? locationsManager.getLocations(targetMap) : [];
    return (
      <MapModal
        onClose={() => this.setSelected(false)}
        isOpen={isSelected}
        selected={this.props.location}
        locations={locations}
      />
    );
  };

  render = () => {
    const { title, iconColor } = this.props.location;
    const { shouldOpenMapsViewer = true } = this.props;
    return (
      <>
        <InlineCardResolvedView
          title={title}
          icon={<LocationIcon label={title} primaryColor={iconColor} />}
          onClick={() => this.setSelected(true)}
        />
        {shouldOpenMapsViewer && this.renderMapModal()}
      </>
    );
  };
}
