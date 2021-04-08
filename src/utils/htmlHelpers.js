import { el, txtEl, imgEl } from "./domHelpers";

const kelvinToFahrenheit = (k) => (((k - 273.15) * 9) / 5 + 32).toFixed(0);

export function createVenueHTML(name, location, iconSource) {
  const venueContainer = el("article", "grid-center w-full mb-8");
  venueContainer.append(
    txtEl("h3", name, "font-heading text-2xl textShadow-lg mb-3"),
    imgEl(iconSource, name, "filter drop-shadow-lg"),
    txtEl("p", location.formattedAddress[0], "my-4"),
    el(
      "div",
      "h-80 w-full md:w-3/4 lg:w-1/2 rounded-none md:rounded-xl filter drop-shadow-lg",
      `${name}-map`
    )
  );
  return venueContainer;
}

export function createWeatherHTML(currentDay) {
  const weatherContainer = el("article", "grid-center w-full");
  weatherContainer.append(
    txtEl("p", `${kelvinToFahrenheit(currentDay.main.temp)}° F`),
    txtEl("p", `${currentDay.weather[0].description.replace(/^\w/, c => c.toUpperCase())}`),
    imgEl(
      `https://openweathermap.org/img/wn/${currentDay.weather[0].icon}@2x.png`,
      "weather icon",
      "filter drop-shadow-lg"
    )
  );
  return weatherContainer;
}
