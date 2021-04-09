import { el, id, q, txtEl } from "./utils/domHelpers";
import {
  createAdvisoryHTML,
  createVenueHTML,
  createWeatherHTML,
} from "./utils/htmlHelpers.js";
import { getCurrentCovidRate } from "./getApiData";

export const renderErrorMessage = (errorMsg) => {
  if (id("error-box")) return
  if (errorMsg == "NetworkError when attempting to fetch resource.") {
    errorMsg =
      "Sorry, a network error occurred while getting your result. Please try again in a bit.";
  } else {
    errorMsg =
      "Sorry, an unexpected error occurred while getting your result. Please check your query and try again.";
  }
  const errorBox = el(
    "article",
    "mb-6 p-6 w-full text-lg bg-red-900 text-white font-bold",
    "error-box"
  );
  errorBox.append(
    txtEl(
      "h2",
      errorMsg
    )
  );
  q("body").insertBefore(errorBox, q("header"));
};

export const renderForecast = (day) =>
  id("weather").append(createWeatherHTML(day));

export const renderLocaleContent = async (venues) => {
  const covidRate = await getCurrentCovidRate(venues[0].location.cc);
  createAdvisoryHTML(covidRate, venues[0].location.country);

  id("venues").append(
    txtEl("h2", "Top Five Sights", "font-heading font-semibold text-3xl mb-5")
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
      [venue.location.lat, venue.location.lng],
      18
    );
    const mapBoxAccToken = import.meta.env.SNOWPACK_PUBLIC_MAPBOX_ACCESS_TOKEN;
    L.tileLayer(
      `https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${mapBoxAccToken}`,
      {
        maxZoom: 24,
        id: "mapbox/streets-v11",
        tileSize: 512,
        zoomOffset: -1,
        accessToken: mapBoxAccToken,
      }
    ).addTo(venueMap);
    L.marker([venue.location.lat, venue.location.lng]).addTo(venueMap);
  });

  id("destination").textContent = `${venues[0].location.city}`;
};
