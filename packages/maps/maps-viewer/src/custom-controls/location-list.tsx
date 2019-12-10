import * as React from 'react';
import { Item } from '@atlaskit/navigation-next';
import LocationIcon from '@atlaskit/icon/glyph/location';
import JiraCaptureIcon from '@atlaskit/icon/glyph/jira/capture';
import { Geolocation, goTo, centerAll } from '@atlaskit/maps-core';

const round = (num: number, decimals: number = 2) =>
  Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);

const getTitle = (location: Geolocation) => {
  const { name, address, coords } = location;
  const formatedTitleCoords = `${round(coords.lat)}, ${round(coords.lng)}`;
  return name || address || formatedTitleCoords;
};

export default ({ locations }: { locations: Geolocation[] }) => {
  return (
    <div style={{ padding: 10 }}>
      {locations.length > 1 && (
        <Item
          before={JiraCaptureIcon}
          text={'Center All'}
          onClick={() => centerAll()}
        />
      )}
      {locations.map((location, i) => {
        const title = getTitle(location);
        const icon = () => (
          <LocationIcon label={title} primaryColor={location.iconColor} />
        );
        return (
          <Item
            key={i}
            before={icon}
            text={title}
            onClick={() => goTo(location)}
          />
        );
      })}{' '}
    </div>
  );
};
