"use strict";

/**
 *
 * @param {Element} parentElement
 * @param {string} html
 * @param {string} position
 * @returns
 */
function render(parentElement, html, position) {
  return parentElement.insertAdjacentHTML(position, html);
}

function clear(parentElement) {
  return (parentElement.innerHTML = "");
}

function getElementPropValue(elment, property, pseudoElt = null) {
  return window.getComputedStyle(elment, pseudoElt)[property];
}

export { render, clear, getElementPropValue };
