import { render, clear, getElementPropValue } from "../utilities";
import { jobListingContainer } from "./jobListingView";

export function renderFilterView() {
  const html = `<div id="filter" class="card job-listing-filter"></div>`;
  return render(jobListingContainer, html, "afterbegin");
}

function playFilterExpandAnimation(filter, wrapper) {
  const wrapperWidth = wrapper.getBoundingClientRect().width;
  const wrapperPadding = +getElementPropValue(wrapper, "paddingInline").replace(
    "px",
    ""
  );
  const filterWidth = wrapperWidth - wrapperPadding * 2 - 43.5;
  if (!filter.classList.contains("open")) {
    filter.style.width = filterWidth + "px";
    filter.classList.remove("hidden");
    filter.classList.add("open");
  }
}

function playFilterCollapseAnimation(filter) {
  if (!filter) throw new Error("Check if filter is defined or visible!");
  if (filter.classList.contains("open")) {
    filter.classList.remove("open");
    filter.classList.add("shrinking");
    setTimeout(() => {
      filter.classList.remove("shrinking");
      filter.classList.add("hidden");
    }, 230);
  }
}

export function removeFilterView() {
  const filter = document.getElementById("filter");
  playFilterCollapseAnimation(filter);
}

function filterButtonMarkup(filterQueries) {
  let buttons = "";
  filterQueries.forEach(
    (v) =>
      (buttons += `<button class="btn btn--filter" value=${v}>${v}</button>`)
  );
  const buttonsWrapper = `<div >${buttons}</div>`;
  return buttonsWrapper;
}
export function addFilterButton(filterQuery) {
  const filter = document.getElementById("filter");
  const filterWrapper = document.getElementById("content");
  playFilterExpandAnimation(filter, filterWrapper);
  clear(filter);
  const filterBtn = filterButtonMarkup(filterQuery);
  render(filter, filterBtn, "afterbegin");
}

export function addFilterClearButton() {
  const container = document.getElementById("filter");
  const clearBtn = '<button class="btn btn--clear">Clear</button>';
  render(container, clearBtn, "beforeend");
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
