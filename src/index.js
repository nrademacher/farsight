// import { getForecast, getVenues } from "./getApiData";
import { txtEl, id, q, hide, unhide, clear } from "./utils/domHelpers.js";
import { createVenueHTML, createWeatherHTML } from "./utils/htmlHelpers.js";
// Add AJAX functions here:
export const getVenues = async () => {
  // Foursquare API Info
  const clientId = import.meta.env.SNOWPACK_PUBLIC_FOURSQUARE_CLIENT_ID;
  const clientSecret = import.meta.env.SNOWPACK_PUBLIC_FOURSQUARE_CLIENT_SECRET;
  const fourSquareUrl = "https://api.foursquare.com/v2/venues/explore?near=";

  const city = q("input").value;
  const day = new Date().toISOString().split("T")[0].replace(/-/g, "");
  const urlToFetch = `${fourSquareUrl}${city}&limit=10&client_id=${clientId}&client_secret=${clientSecret}&v=${day}`;

  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      console.log(jsonResponse);
      const venues = jsonResponse.response.groups[0].items.map(
        (item) => item.venue
      );
      // console.log(venues);
      return venues;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getForecast = async () => {
  // OpenWeather Info
  const openWeatherKey = import.meta.env.SNOWPACK_PUBLIC_OPENWEATHER_API_KEY;
  const weatherUrl = "https://api.openweathermap.org/data/2.5/weather";

  const urlToFetch = `${weatherUrl}?&q=${q("input").value}&APPID=${openWeatherKey}`;
  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      console.log(jsonResponse);
      return jsonResponse;
    }
  } catch (error) {
    console.log(error);
  }
};

const renderVenues = (venues) => {
  id("venues").append(
    txtEl("h2", "Top Five Attractions", "font-heading text-4xl mb-5")
  );
  [1, 2, 3, 4, 5].forEach((_, index) => {
    let venue = venues[index];
    console.log(venue);
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

const renderForecast = (day) => id("weather").append(createWeatherHTML(day));

function executeSearch() {
  q("body").classList.remove("h-screen");
  q("header").classList.add("mt-2", "mb-8");
  hide(id("title"));
  hide(id("subtitle"));
  unhide(id("container"));
  unhide(q("footer"));
  clear(id("destination"));
  clear(id("weather"));
  clear(id("venues"));
  getVenues().then((venues) => renderVenues(venues));
  getForecast().then((forecast) => renderForecast(forecast));
  q("input").value = "";
  q("input").placeholder = "Enter a new place";
  return false;
}

q("form").addEventListener("submit", (e) => {
  e.preventDefault();
  executeSearch();
});
