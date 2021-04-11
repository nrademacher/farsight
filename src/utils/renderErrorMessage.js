import {
  id, el, textEl, q,
} from './domHelpers';

const renderErrorMessage = (errorMsg) => {
  if (id('error-box')) return;
  let renderMsg;
  if (errorMsg === 'NetworkError when attempting to fetch resource.') {
    renderMsg = 'Sorry, a network error occurred while getting your result. Please try again in a bit.';
  } else {
    renderMsg = 'Sorry, an unexpected error occurred while getting your result. Please check your query and try again.';
  }
  const errorBox = el(
    'article',
    'mb-6 p-6 w-full text-lg bg-red-900 text-white font-bold',
    'error-box',
  );
  errorBox.append(textEl('h2', renderMsg));
  q('body').insertBefore(errorBox, q('header'));
};

export default renderErrorMessage;
