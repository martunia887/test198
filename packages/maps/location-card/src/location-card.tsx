import React from 'react';
import { InlineCardResolvedView } from '@atlaskit/media-ui';
import LocationIcon from '@atlaskit/icon/glyph/location';
import { Geolocation, locationsManager } from '@atlaskit/maps-core';
import { MapModal, LocationPicker } from '@atlaskit/maps-viewer';

export type LocationCardProps = {
  location: Geolocation;
  // Viewer options
  useViewer?: 'standard' | 'picker' | false;
  targetMap?: string | false;
};

type LocationCardState = {
  isSelected: boolean;
};

export default class LocationCard extends React.Component<
  LocationCardProps,
  LocationCardState
> {
  static defaultProps: Partial<LocationCardProps> = {
    useViewer: 'standard',
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

  renderMapViewer = () => {
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

  renderGeolocator = () => {
    const { isSelected } = this.state;
    const { targetMap } = this.props;
    const locations = targetMap ? locationsManager.getLocations(targetMap) : [];
    return (
      <LocationPicker
        onClose={() => this.setSelected(false)}
        isOpen={isSelected}
        selected={this.props.location}
        locations={locations}
        onSelected={() => {
          console.log('I changed my mind');
        }}
      />
    );
  };

  render = () => {
    const { title, iconColor } = this.props.location;
    const { useViewer } = this.props;
    return (
      <>
        <InlineCardResolvedView
          title={title}
          icon={<LocationIcon label={title} primaryColor={iconColor} />}
          onClick={() => this.setSelected(true)}
        />
        {useViewer === 'standard' && this.renderMapViewer()}
        {useViewer === 'picker' && this.renderGeolocator()}
      </>
    );
  };
}
