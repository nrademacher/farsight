import { id, txtEl } from "./utils/domHelpers";
import { createVenueHTML, createWeatherHTML } from "./utils/htmlHelpers.js";

export const renderVenues = (venues) => {
  id("venues").append(
    txtEl("h2", "Top Five Attractions", "font-heading text-4xl mb-5")
  );
  [1, 2, 3, 4, 5].forEach((_, index) => {
    let venue = venues[index];
    const venueIcon = venue.categories[0].icon;
    const venueImgSrc = `${venueIcon.prefix}bg_64${venueIcon.suffix}`;
    const venueContent = createVenueHTML(
      venue.name,
      venue.location,
      venueImgSrc
    );
    id("venues").append(venueContent);
    const venueMap = L.map(`${venue.name}-map`).setView(
      [venue.location.lat.toFixed(3), venue.location.lng.toFixed(2)],
      18
    );
    const mapBoxAccToken = import.meta.env.SNOWPACK_PUBLIC_MAPBOX_ACCESS_TOKEN;
    L.tileLayer(
      `https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${mapBoxAccToken}`,
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 24,
        id: "mapbox/streets-v11",
        tileSize: 512,
        zoomOffset: -1,
        accessToken: mapBoxAccToken,
      }
    ).addTo(venueMap);
  });
  id("destination").textContent = `${venues[0].location.city}`;
};

export const renderForecast = (day) =>
  id("weather").append(createWeatherHTML(day));
