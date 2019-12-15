import * as React from 'react';
import { Node } from 'prosemirror-model';
import { SelectionBasedNodeView } from '../../../nodeviews/ReactNodeView';
import LocationCard from '@atlaskit/location-card';

import { Geolocation, GeolocationOptions } from '@atlaskit/maps-core';

type Props = {
  node: Node;
};

export class InlineCardComponent extends React.PureComponent<Props> {
  render() {
    const { node } = this.props;
    const locationData = node.attrs as GeolocationOptions;
    return (
      <LocationCard
        location={new Geolocation(locationData)}
        // shouldOpenMapsViewer={false}
        targetMap={'editor'}
      />
    );
  }
}

export class InlineLocationCard extends SelectionBasedNodeView {
  render() {
    return <InlineCardComponent node={this.node} />;
  }
}
