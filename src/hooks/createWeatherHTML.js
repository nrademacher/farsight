import { el, textEl, imgEl } from '../utils/domUtils';
import { kelvinToCelsius, kelvinToFahrenheit } from '../utils/miscHelpers';

function createWeatherHTML(currentDay) {
  const weatherContainer = el('article', 'grid-center w-full mb-4');
  weatherContainer.append(
    textEl(
      'p',
      `${kelvinToCelsius(currentDay.main.temp)} °C  /  ${kelvinToFahrenheit(
        currentDay.main.temp
      )} °F`,
      'mb-2'
    ),
    textEl(
      'p',
      `${currentDay.weather[0].description.replace(/^\w/, (c) =>
        c.toUpperCase()
      )}`
    ),
    imgEl(
      `https://openweathermap.org/img/wn/${currentDay.weather[0].icon}@2x.png`,
      'weather icon',
      'filter drop-shadow-lg'
    )
  );
  return weatherContainer;
}

export default createWeatherHTML
