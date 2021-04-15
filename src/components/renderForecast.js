import createWeatherHTML from '../hooks/createWeatherHTML';

const renderForecast = (day) =>
  document.getElementById('weather').append(createWeatherHTML(day));

export default renderForecast
