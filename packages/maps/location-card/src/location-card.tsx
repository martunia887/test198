import React from 'react';
import { InlineCardResolvedView } from '@atlaskit/media-ui';
import LocationIcon from '@atlaskit/icon/glyph/location';
import { Geolocation, locationsManager } from '@atlaskit/maps-core';
import { MapModal } from '@atlaskit/maps-viewer';

export type LocationCardProps = {
  location: Geolocation;
};

type LocationCardState = {
  isSelected: boolean;
};

export default class LocationCard extends React.Component<
  LocationCardProps,
  LocationCardState
> {
  state: LocationCardState = {
    isSelected: false,
  };

  componentDidMount() {
    locationsManager.register(this.props.location);
  }

  componentDidUpdate(prevProps: LocationCardProps) {
    if (prevProps.location !== this.props.location) {
      locationsManager.unRegister(prevProps.location);
      locationsManager.register(this.props.location);
    }
  }

  componentWillUnmount() {
    locationsManager.unRegister(this.props.location);
  }

  setSelected = (isSelected: boolean) => {
    this.setState({ isSelected });
  };

  renderMapModal = () => {
    const { isSelected } = this.state;
    return (
      <MapModal
        onClose={() => this.setSelected(false)}
        isOpen={isSelected}
        selected={this.props.location}
        locations={locationsManager.getLocations()}
      />
    );
  };

  render = () => {
    const { title, iconColor } = this.props.location;
    return (
      <>
        <InlineCardResolvedView
          title={title}
          icon={<LocationIcon label={title} primaryColor={iconColor} />}
          onClick={() => this.setSelected(true)}
        />
        {this.renderMapModal()}
      </>
    );
  };
}
