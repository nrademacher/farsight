import { createWeatherHTML } from '../hooks/createHTML';

const renderForecast = (day) =>
  document.getElementById('weather').append(createWeatherHTML(day));

export default renderForecast
