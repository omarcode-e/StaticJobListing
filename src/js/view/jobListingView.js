import { render } from "../utilities";
import { renderTabletButton } from "./tabletButtonView";

export const jobListingContainer = document.getElementById("content");
const renderLabel = function (data) {
  let html = "";
  if (data.featured) {
    html += `<div class="job-info__label" data-label="featured">
          <p>Featured</p>
         </div>
        `;
  }
  if (data.new) {
    html += `<div class="job-info__label" data-label="new">
        <p>New!</p>
       </div>
      `;
  }
  return html;
};

function createJobListing(data) {
  const html = `
      <section class="job-listing ${
        data.new ? "job-listing--new" : ""
      }" data-id="${data.id}">
        <div class="job-info">
         <div class="job-info__company-logo">
           <img src="${data.logo}" alt="${data.company}-logo" />
         </div>
          <p class="job-info__company-name">${data.company}</p>
          ${renderLabel(data)}
          <p class="job-info__job-title">${data.position}</p>
          <p class="job-info__post-time">${data.postedAt}</p>
          <p class="job-info__contract">${data.contract}</p>
          <p class="job-info__location">${data.location}</p>
        </div>

        <div class="job-listing__tablets">
        ${renderTabletButton(data.role, "role")}
        ${renderTabletButton(data.level, "level")}
        ${renderTabletButton(data.languages, "languages")}
        ${renderTabletButton(data.tools, "tools")}
        </div>

      </section>
    `;
  return html;
}

export function renderJobEntries(parentElement, data) {
  let tempHtml = document.createDocumentFragment();
  data.forEach((entry) => tempHtml.append(createJobListing(entry)));
  const finalHtml = tempHtml.textContent;
  return render(parentElement, finalHtml, "beforeend");
}

export function removeJobEntries() {
  const jobListings = document.querySelectorAll(".job-listing");
  jobListings.forEach((job) => job.remove());
}
