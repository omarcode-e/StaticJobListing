import { render, clear } from "../utilities";
import { jobListingContainer } from "./jobListingView";

export function filterView() {
  const html = `<div id="filter" class="job-listing-filter"></div>`;
  return render(jobListingContainer, html, "afterbegin");
}

function filterButtonMarkup(filterQueries) {
  let btn = "";
  filterQueries.forEach(
    (v) => (btn += `<button class="btn btn--filter" value=${v}>${v}</button>`)
  );
  return btn;
}

export function addFilterClearButton() {
  const container = document.getElementById("filter");
  const clearBtn = '<button class="btn btn--clear">Clear</button>';
  render(container, clearBtn, "beforeend");
}

export function addFilterButton(filterObject) {
  const container = document.getElementById("filter");
  clear(container);
  const filterBtn = filterButtonMarkup(filterObject);
  render(container, filterBtn, "afterbegin");
}

export function removeFilterButton(filterValue) {
  const btn = document.querySelector(`.btn--filter[value=${filterValue}]`);
  return btn.remove();
}

export function removeAllFilterButtons() {
  const container = document.getElementById("filter");
  clear(container);
}

export function filterClickHandler(handler) {
  const container = document.getElementById("filter");
  return container.addEventListener("click", (e) => {
    if (!e.target.matches(".btn--filter") || e.target.matches(".btn-clear"))
      return;
    handler(e);
  });
}

export function filterClearButtonClickHandler(handler) {
  const container = document.getElementById("filter");
  return container.addEventListener("click", (e) => {
    if (!e.target.matches(".btn--clear")) return;
    handler();
  });
}
