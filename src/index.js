import { id, q, hide, unhide, clear, txtEl } from "./utils/domHelpers.js";
import { getForecast, getVenues } from "./getApiData";
import {
  renderErrorMessage,
  renderForecast,
  renderLocaleContent,
} from "./renderFuncs";

function executeSearch() {
  // Transform header with search input to sit horizontally at top
  hide(id("title"));
  hide(id("subtitle"));
  q("body").classList.remove("h-screen");
  q("header").classList.add("mb-8");
  q("input").classList.remove("block");
  q("form").classList.add("space-x-4");

  // Show loading indication while content resolves
  const loadingTxt = txtEl(
    "h2",
    "Loading...",
    "animate-pulse animate-spin mb-6 font-heading text-xl"
  );
  q("body").insertBefore(loadingTxt, q("main"));

  // Remove any error message rendered from previous search
  if (id("error-box")) {
    q("body").removeChild(id("error-box"));
  }
  // Clear content rendered from previous search
  clear(id("covid-advisory"));
  clear(id("destination"));
  clear(id("weather"));
  clear(id("venues"));

  // Show new content if API requests have successfully resolved
  Promise.all([
    getForecast().then((forecast) => renderForecast(forecast)),
    getVenues().then((venues) => renderLocaleContent(venues)),
  ])
    .then(() => {
      unhide(id("container"));
      unhide(q("footer"));
      q("input").value = "";
      q("input").placeholder = "Enter a new place";
    })
    .catch((e) => renderErrorMessage(e.message))
    .finally(() => q("body").removeChild(loadingTxt));
}

q("form").addEventListener("submit", (e) => {
  e.preventDefault();
  executeSearch();
});
