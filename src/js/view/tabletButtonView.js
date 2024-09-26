import { render } from "../utilities";

const jobListingContainer = document.getElementById("content");
function renderTabletButton(data) {
  if (!data || data.length === 0) return "";
  const dataArr = Array.from([data]).flat();
  let html = "";
  dataArr.forEach(
    (entry) =>
      (html += `<button class="btn btn--tablet" type="button" value=${entry}>${entry}</button>`)
  );
  return html;
}

function getTabletCatagory(e) {
  return e.target.dataset.catagory;
}

function getTabletValue(e) {
  return e.target.value;
}

function tabletClickHandler(handler) {
  jobListingContainer.addEventListener("click", (e) => {
    if (!e.target.matches(".btn--tablet")) return;
    handler(e);
  });
}

export {
  renderTabletButton,
  getTabletCatagory,
  getTabletValue,
  tabletClickHandler,
};
