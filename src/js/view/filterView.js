import { render, clear, getElementPropValue } from "../utilities";
import { jobListingContainer } from "./jobListingView";

function renderFilterView() {
  const html = `
  <div id="filter" class="card job-listing-filter">
    <div></div>
  </div>
  `;
  return render(jobListingContainer, html, "afterbegin");
}

function getFilterWidthOffset(filter, wrapper) {
  const wrapperWidth = wrapper.getBoundingClientRect().width;
  const wrapperPadX = +getElementPropValue(wrapper, "paddingInline").replace(
    "px",
    ""
  );
  const filterPadXstart = +getElementPropValue(
    filter,
    "paddingInlineStart"
  ).replace("px", "");
  const filterPadXend = +getElementPropValue(
    filter,
    "paddingInlineEnd"
  ).replace("px", "");
  const finalWidth =
    wrapperWidth - wrapperPadX * 2 - (filterPadXstart + filterPadXend);
  return finalWidth;
}

function playFilterExpandAnimation(filter, wrapper) {
  const wrapperWidth = wrapper.getBoundingClientRect().width;
  const filterWidth = getFilterWidthOffset(filter, wrapper);
  if (!filter.classList.contains("open")) {
    filter.style.width = filterWidth + "px";
    filter.classList.remove("hidden");
    filter.classList.add("open");
  }
  setTimeout(() => {
    filter.style.width = `${(filterWidth * 100) / wrapperWidth}%`;
  }, 200);
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

function removeFilterView() {
  const filter = document.getElementById("filter");
  playFilterCollapseAnimation(filter);
}

function filterButtonMarkup(buttonValue) {
  const btn = `<button class="btn btn--filter" value="${buttonValue}">${buttonValue}</button>`;
  return btn;
}

function addFilterButton(buttonValue) {
  const filter = document.getElementById("filter");
  const filterWrapper = document.getElementById("content");
  playFilterExpandAnimation(filter, filterWrapper);
  const filterButtonsWrapper = document.querySelector("#filter > div");
  const filterButtons = filterButtonMarkup(buttonValue);
  render(filterButtonsWrapper, filterButtons, "beforeend");
}

function addFilterClearButton() {
  const container = document.getElementById("filter");
  const clearBtn = '<button class="btn btn--clear">Clear</button>';
  render(container, clearBtn, "beforeend");
}

function removeFilterClearButton() {
  const filterClearButton = document.querySelector(".btn--clear");
  filterClearButton.remove();
}

function removeFilterButton(filterValue) {
  const btn = document.querySelector(`.btn--filter[value=${filterValue}]`);
  return btn.remove();
}

function removeAllFilterButtons() {
  const filterButtonsWrapper = document.querySelector("#filter > div");
  clear(filterButtonsWrapper);
}

function filterClickHandler(handler) {
  const container = document.getElementById("filter");
  return container.addEventListener("click", (e) => {
    if (!e.target.matches(".btn--filter") || e.target.matches(".btn--clear"))
      return;
    handler(e);
  });
}

function filterClearButtonClickHandler(handler) {
  const container = document.getElementById("filter");
  return container.addEventListener("click", (e) => {
    if (!e.target.matches(".btn--clear")) return;
    handler();
  });
}

export {
  renderFilterView,
  removeFilterView,
  addFilterButton,
  addFilterClearButton,
  removeFilterClearButton,
  removeFilterButton,
  removeAllFilterButtons,
  filterClickHandler,
  filterClearButtonClickHandler,
};
