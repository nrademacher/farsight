import { q } from "./utils/domHelpers";

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

  const urlToFetch = `${weatherUrl}?&q=${
    q("input").value
  }&APPID=${openWeatherKey}`;
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
