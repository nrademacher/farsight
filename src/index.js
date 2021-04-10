import {
  id,
  q,
  qA,
  cn,
  apply,
  remove,
  hide,
  unhide,
  clear,
  txtEl,
  clAdd,
  clRm,
  copy
} from './utils/domHelpers.js'
import { getForecast, getVenues } from './getApiData'
import {
  renderErrorMessage,
  renderForecast,
  renderLocaleContent
} from './renderFuncs'

function executeSearch () {
  // Transform header with search input to sit horizontally at top
  apply(qA('header :not(form, input, button)'), hide)
  clRm(q('body'), 'h-screen')
  clAdd(q('header'), 'mb-8')
  clRm(q('input'), 'block')
  clAdd(q('form'), 'space-x-4')

  // Show loading indicator while content resolves
  const loadingTxt = txtEl(
    'h2',
    'Loading...',
    'animate-pulse mb-6 font-heading text-xl'
  )
  q('body').insertBefore(loadingTxt, q('main'))

  // Remove any error message rendered from previous search
  if (id('error-box')) {
    remove(id('error-box'))
  }
  // Clear content rendered from previous search
  apply(cn('content'), clear)

  // Show new content if API requests have successfully resolved
  Promise.all([
    getForecast().then((forecast) => renderForecast(forecast)),
    getVenues().then((venues) => renderLocaleContent(venues))
  ])
    .then(() => {
      unhide(id('container'))
      unhide(q('footer'))
      q('input').value = ''
      q('input').placeholder = 'Enter a new place'
    })
    .catch((e) => renderErrorMessage(e.message))
    .finally(() => remove(loadingTxt))
}

q('form').onsubmit = (e) => {
  e.preventDefault()
  executeSearch()
}
