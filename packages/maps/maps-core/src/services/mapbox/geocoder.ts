import mbClient from '@mapbox/mapbox-sdk';
import mbGeocoderFactory from '@mapbox/mapbox-sdk/services/geocoding';
import { Geolocation } from './../../';
const ACCESS_TOKEN =
  'pk.eyJ1Ijoiam9zZS1udW5lei1hdGxhcyIsImEiOiJjazJ2NDc0bHQwMTZ3M2xwbThkNnBtaGhrIn0.HqY00u5U1a4juO9Md4lFMA';

const baseClient = mbClient({ accessToken: ACCESS_TOKEN });

const mbGeocoder = mbGeocoderFactory(baseClient);

const forwardGeocode = async (query: string): Promise<Geolocation[]> => {
  if (!query) {
    return [];
  }
  const { body } = await mbGeocoder
    .forwardGeocode({ query, limit: 10, mode: 'mapbox.places' })
    .send();
  if (body && body.features && body.features instanceof Array) {
    const result = body.features.map(
      (feature: any): Geolocation => {
        return new Geolocation({
          coords: { lng: feature.center[0], lat: feature.center[1] },
          address: feature.place_name,
        });
      },
    );
    return result;
  } else {
    return [];
  }
};

export default {
  forwardGeocode,
};
