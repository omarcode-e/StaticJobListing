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
  return (parentElement.innerHtml = "");
}

export { render, clear };
