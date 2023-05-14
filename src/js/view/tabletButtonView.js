import { render } from "../utilities";

const jobListingContainer = document.getElementById("content");
export function renderTabletButton(data) {
  if (!data || data.length === 0) return "";
  const dataArr = Array.from([data]).flat();
  let html = "";
  dataArr.forEach(
    (entry) =>
      (html += `<button class="btn btn--tablet" type="button" value=${entry}>${entry}</button>`)
  );
  return html;
}

export function getTabletCatagory(e) {
  return e.target.dataset.catagory;
}

export function getTabletValue(e) {
  return e.target.value;
}

export function TabletClickHandler(handler) {
  jobListingContainer.addEventListener("click", (e) => {
    if (!e.target.matches(".btn--tablet")) return;
    handler(e);
  });
}
