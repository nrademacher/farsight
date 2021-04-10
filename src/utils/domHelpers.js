// Element selection helpers
export const q = (query) => document.querySelector(query)

export const qA = (query) => document.querySelectorAll(query)

export const id = (elId) => document.getElementById(elId)

export const cn = (className) => document.getElementsByClassName(className)

// Element utility functions
export const hide = (el) => (el.hidden = true)

export const unhide = (el) => (el.hidden = false)

export const clear = (el) => (el.textContent = '')

export const remove = (el) => el.parentNode.removeChild(el)

export const clAdd = (el, elClass) => {
  elClass = elClass.split(' ')
  el.classList.add(...elClass)
}

export const clRm = (el, elClass) => {
  elClass = elClass.split(' ')
  el.classList.remove(...elClass)
}

export const clRpl = (el, elCl1, elCl2) => el.classList.replace(elCl1, elCl2)

export const apply = (elements, func, ...funcParams) => {
  if (elements.length > 1) {
    [...elements].forEach((el) => func(el, ...funcParams))
  } else {
    func(elements, ...funcParams)
  }
}

// Element creation helpers

export const generate = (containerEl, amount, elGenFunc, ...elGenFunParams) => {
  let i = amount
  while (i > 0) {
    containerEl.append(elGenFunc(...elGenFunParams))
    i -= 1
  }
}

export const copy = (el, containerEl = el.parentNode) => {
  const copiedEl = el.cloneNode(true)
  containerEl.append(copiedEl)
}

export function el (tag, elClass, elId) {
  const htmlEl = document.createElement(tag)
  if (elClass && typeof elClass === 'string') {
    clAdd(htmlEl, elClass)
  }
  if (elId) {
    htmlEl.id = elId
  }
  return htmlEl
}

export function txtEl (tag, txt, elClass, elId) {
  const htmlEl = el(tag, elClass, elId)
  htmlEl.textContent = txt
  return htmlEl
}

export function imgEl (src, alt, elClass, elId) {
  const img = el('img', elClass, elId)
  img.setAttribute('src', src)
  img.setAttribute('alt', alt)
  return img
}
