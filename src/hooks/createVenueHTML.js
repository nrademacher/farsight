import { el, textEl, imgEl } from '../utils/domUtils';

function createVenueHTML(name, location, iconSource) {
  const venueContainer = el('article', 'grid-center w-full mb-12');
  venueContainer.append(
    textEl('h3', name, 'font-heading text-2xl textShadow-lg mb-3'),
    imgEl(iconSource, name, 'filter drop-shadow-lg'),
    textEl('p', location.formattedAddress[0], 'my-4'),
    el(
      'div',
      'h-60 md:h-80 w-full md:w-3/4 lg:w-1/2 rounded-none md:rounded-lg filter drop-shadow-lg',
      `${name}-map`
    )
  );
  return venueContainer;
}

export default createVenueHTML;
