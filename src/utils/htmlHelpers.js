import { el, id, txtEl, imgEl } from "./domHelpers";
import { kelvinToCelsius, kelvinToFahrenheit } from "./miscHelpers.js";

export function createAdvisoryHTML(covidRate, locale) {
  const advisoryBox = el(
    "article",
    "mb-6 p-6 rounded-none md:rounded-lg text-lg"
  );

  let advisory;
  if (covidRate >= 0.005) {
    advisory = txtEl(
      "h3",
      `Current Covid incidence rate in ${locale} is very high. Travel strictly not advised.`
    );
    advisoryBox.classList.add("text-red-900", "bg-red-400", "font-bold");
  } else if (covidRate >= 0.0025) {
    advisory = txtEl(
      "h3",
      `Current Covid incidence rate in ${locale} is high. Travel not advised.`
    );
    advisoryBox.classList.add("text-red-600", "bg-red-200");
  } else if (covidRate >= 0.001) {
    advisory = txtEl(
      "h3",
      `Current Covid incidence rate in ${locale} is moderate. Caution advised.`
    );
    advisoryBox.classList.add("text-yellow-600", "bg-yellow-200");
  } else if (covidRate >= 0.0005) {
    advisory = txtEl(
      "h3",
      `Current Covid incidence rate in ${locale} is low. Take care.`
    );
    advisoryBox.classList.add("text-green-600", "bg-green-200");
  } else if (covidRate < 0.0005) {
    advisory = txtEl(
      "h3",
      `Current Covid incidence rate in ${locale} is very low.`
    );
    advisoryBox.classList.add("text-green-900", "bg-green-300");
  } else {
    advisory = txtEl(
      "h3",
      `Caution: Could not find Covid incidence rate for ${locale}.`
    );
    advisoryBox.classList.add("text-red-900", "bg-red-400", "font-bold");
  }
  advisoryBox.append(advisory);
  id("covid-advisory").append(advisoryBox);
}

export function createVenueHTML(name, location, iconSource) {
  const venueContainer = el("article", "grid-center w-full mb-12");
  venueContainer.append(
    txtEl("h3", name, "font-heading text-2xl textShadow-lg mb-3"),
    imgEl(iconSource, name, "filter drop-shadow-lg"),
    txtEl("p", location.formattedAddress[0], "my-4"),
    el(
      "div",
      "h-60 md:h-80 w-full md:w-3/4 lg:w-1/2 rounded-none md:rounded-lg filter drop-shadow-lg",
      `${name}-map`
    )
  );
  return venueContainer;
}

export function createWeatherHTML(currentDay) {
  const weatherContainer = el("article", "grid-center w-full mb-4");
  weatherContainer.append(
    txtEl(
      "p",
      `${kelvinToCelsius(currentDay.main.temp)} °C  /  ${kelvinToFahrenheit(
        currentDay.main.temp
      )} °F`,
      "mb-2 font-light"
    ),
    txtEl(
      "p",
      `${currentDay.weather[0].description.replace(/^\w/, (c) =>
        c.toUpperCase()
      )}`
    ),
    imgEl(
      `https://openweathermap.org/img/wn/${currentDay.weather[0].icon}@2x.png`,
      "weather icon",
      "filter drop-shadow-lg"
    )
  );
  return weatherContainer;
}
