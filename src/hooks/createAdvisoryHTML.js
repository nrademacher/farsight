import { el, id, clAdd, linkEl } from '../utils/domUtils';

function createAdvisoryHTML(covidRate, locale) {
  const advisoryBox = el(
    'article',
    'mb-6 p-6 rounded-none md:rounded-lg text-base md:text-lg space-x-1'
  );
  const advisory = el('h3', 'inline-block');
  if (covidRate >= 0.005) {
    advisory.textContent = `Current Covid incidence rate in ${locale} is very high. Travel strictly not advised.`;
    clAdd(advisoryBox, 'text-red-900 bg-red-400 font-bold');
  } else if (covidRate >= 0.0025) {
    advisory.textContent = `Current Covid incidence rate in ${locale} is high. Travel not advised.`;
    clAdd(advisoryBox, 'text-red-600 bg-red-200');
  } else if (covidRate >= 0.001) {
    advisory.textContent = `Current Covid incidence rate in ${locale} is moderate. Caution advised.`;
    clAdd(advisoryBox, 'text-yellow-600 bg-yellow-200');
  } else if (covidRate >= 0.0005) {
    advisory.textContent = `Current Covid incidence rate in ${locale} is low. Take care.`;
    clAdd(advisoryBox, 'text-green-600 bg-green-200');
  } else if (covidRate < 0.0005) {
    advisory.textContent = `Current Covid incidence rate in ${locale} is very low.`;
    clAdd(advisoryBox, 'text-green-100 bg-green-400');
  } else {
    advisory.textContent = `Caution: Could not find Covid incidence rate for ${locale}.`;
    clAdd(advisoryBox, 'text-red-900 bg-red-400 font-bold');
  }

  const linkLocale =
    locale === 'United States' ? 'us' : locale.toLowerCase().replace(' ', '-');
  const learnMore = linkEl(
    `https://www.worldometers.info/coronavirus/country/${linkLocale.toLowerCase()}`,
    '_blank',
    'Learn more.',
    'underline inline-block'
  );

  advisoryBox.append(advisory, learnMore);
  id('covid-advisory').append(advisoryBox);
}

export default createAdvisoryHTML
