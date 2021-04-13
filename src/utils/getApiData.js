import { q } from './domUtils';
import renderErrorMessage from '../hooks/renderErrorMessage';

export async function getCurrentCovidRate(country) {
  try {
    const response = await fetch(
      `https://disease.sh/v3/covid-19/countries/${country}`,
    );
    if (response.ok) {
      const jsonResponse = await response.json();
      return jsonResponse.active / jsonResponse.population;
    }
    throw new Error();
  } catch (error) {
    renderErrorMessage(error.message);
  }
  return false;
}

export async function getVenues() {
  const clientId = import.meta.env.SNOWPACK_PUBLIC_FOURSQUARE_CLIENT_ID;
  const clientSecret = import.meta.env.SNOWPACK_PUBLIC_FOURSQUARE_CLIENT_SECRET;
  const fourSquareUrl = 'https://api.foursquare.com/v2/venues/explore?near=';

  const locale = q('input').value;
  const day = new Date().toISOString().split('T')[0].replace(/-/g, '');
  const urlToFetch = `${fourSquareUrl}${locale}&limit=10&client_id=${clientId}&client_secret=${clientSecret}&v=${day}`;

  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      const venues = jsonResponse.response.groups[0].items.map(
        (item) => item.venue,
      );
      return venues;
    }
    throw new Error();
  } catch (error) {
    renderErrorMessage(error.message);
  }
  return false;
}

export async function getForecast() {
  const openWeatherKey = import.meta.env.SNOWPACK_PUBLIC_OPENWEATHER_API_KEY;
  const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';

  const urlToFetch = `${weatherUrl}?&q=${
    q('input').value
  }&APPID=${openWeatherKey}`;
  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      return jsonResponse;
    }
    throw new Error();
  } catch (error) {
    renderErrorMessage(error.message);
  }
  return false;
}
