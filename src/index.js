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
} from './utils/domHelpers';
import { getForecast, getVenues } from './getApiData';
import { renderForecast, renderLocaleContent } from './renderContent';
import renderErrorMessage from './utils/renderErrorMessage';

function executeSearch() {
  hide(qA('header :not(form, input, button)'));
  clRm(q('body'), 'h-screen');
  clAdd(q('header'), 'mb-8');
  clRm(q('input'), 'block');
  clAdd(q('form'), 'space-x-4');

  const loadingTxt = textEl(
    'h2',
    'Loading...',
    'animate-pulse mb-6 font-heading text-xl',
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
