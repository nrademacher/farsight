export function el(tag, elClass, elId) {
  const htmlEl = document.createElement(tag);
  if (elClass && typeof elClass == "string") {
    elClass = elClass.split(" ");
    htmlEl.classList.add(...elClass);
  }
  if (elId) {
    htmlEl.id = elId;
  }
  return htmlEl;
}

export function txtEl(tag, txt, elClass) {
  const htmlEl = el(tag, elClass);
  htmlEl.textContent = txt;
  return htmlEl;
}

export function imgEl(src, alt, elClass) {
  const img = el("img", elClass);
  img.setAttribute("src", src);
  img.setAttribute("alt", alt);
  return img;
}

export const q = (query) => document.querySelector(query);

export const id = (elId) => document.getElementById(elId);

export const hide = (el) => (el.hidden = true);

export const unhide = (el) => (el.hidden = false);

export const clear = (el) => (el.textContent = "");
