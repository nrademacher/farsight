import {
  id,
  q,
  qA,
  cn,
  remove,
  hide,
  unhide,
  clear,
  textEl,
  clAdd,
  clRm,
  clRp,
} from './utils/domUtils';
import { getForecast, getVenues } from './utils/getApiData';
import renderForecast from "./components/renderForecast";
import renderLocaleContent from "./components/renderLocaleContent";
import renderErrorMessage from './hooks/renderErrorMessage';

function executeSearch() {
  clRm(q('body'), 'h-screen');
  hide(qA('header :not(form, input, button)'));
  clAdd(q('header'), 'mb-8');
  clRp(q('input'), 'block', 'mr-4');

  const loadingTxt = textEl(
    'h2',
    'Loading...',
    'animate-pulse mb-6 font-heading text-xl'
  );
  q('body').insertBefore(loadingTxt, q('main'));

  if (id('error-box')) {
    remove(id('error-box'));
  }
  clear(cn('content'));

  Promise.all([
    getForecast().then((forecast) => renderForecast(forecast)),
    getVenues().then((venues) => renderLocaleContent(venues)),
  ])
    .then(() => {
      unhide(id('container'));
      unhide(q('footer'));
      q('input').value = '';
      q('input').placeholder = 'Enter a new place';
    })
    .catch((e) => renderErrorMessage(e.message))
    .finally(() => remove(loadingTxt));
}

q('form').onsubmit = (e) => {
  e.preventDefault();
  executeSearch();
};
