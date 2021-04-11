import { id, textEl } from './utils/domHelpers';
import {
  createAdvisoryHTML,
  createVenueHTML,
  createWeatherHTML,
} from './utils/htmlHelpers';
import { getCurrentCovidRate } from './getApiData';

export const renderForecast = (day) => id('weather').append(createWeatherHTML(day));

export const renderLocaleContent = async (venues) => {
  const covidRate = await getCurrentCovidRate(venues[0].location.cc);
  createAdvisoryHTML(covidRate, venues[0].location.country);

  id('venues').append(
    textEl('h2', 'Top Five Sights', 'font-heading font-semibold text-3xl mb-5'),
  );

  [1, 2, 3, 4, 5].forEach((_, index) => {
    const venue = venues[index];
    const venueIcon = venue.categories[0].icon;
    const venueImgSrc = `${venueIcon.prefix}bg_64${venueIcon.suffix}`;
    const venueContent = createVenueHTML(
      venue.name,
      venue.location,
      venueImgSrc,
    );
    id('venues').append(venueContent);
    const venueMap = L.map(`${venue.name}-map`).setView(
      [venue.location.lat, venue.location.lng],
      18,
    );
    const mapBoxAccToken = import.meta.env.SNOWPACK_PUBLIC_MAPBOX_ACCESS_TOKEN;
    L.tileLayer(
      `https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${mapBoxAccToken}`,
      {
        maxZoom: 24,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: mapBoxAccToken,
      },
    ).addTo(venueMap);
    L.marker([venue.location.lat, venue.location.lng]).addTo(venueMap);
  });

  id('destination').textContent = `${venues[0].location.city}`;
};
