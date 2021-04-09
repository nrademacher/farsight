import { id, q, hide, unhide, clear } from "./utils/domHelpers.js";
import { getForecast, getVenues } from "./getApiData";
import { renderForecast, renderLocaleContent } from "./renderFuncs";

function executeSearch() {
  q("body").classList.remove("h-screen");
  q("header").classList.add("mt-2", "mb-8");

  hide(id("title"));
  hide(id("subtitle"));

  unhide(id("container"));
  unhide(q("footer"));

  clear(id("covid-advisory"));
  clear(id("destination"));
  clear(id("weather"));
  clear(id("venues"));

  getVenues().then((venues) => renderLocaleContent(venues));
  getForecast().then((forecast) => renderForecast(forecast));

  q("input").value = "";
  q("input").placeholder = "Enter a new place";

  return true;
}

q("form").addEventListener("submit", (e) => {
  e.preventDefault();
  executeSearch();
});
