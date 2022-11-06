import { render } from "../utilities";
import { renderTabletButton } from "./tabletButtonView";
import data from "../../data/data.json";

const jobListingContainer = document.querySelector("#content");
const renderLabel = function (data) {
  let html = "";
  if (data.featured) {
    html += `<div class="label">
          <p>Featured</p>
         </div>
        `;
  }
  if (data.new) {
    html += `<div class="label">
        <p>New!</p>
       </div>
      `;
  }
  return html;
};

export default function renderJobListing(parentElement, data) {
  console.log(data);
  console.log(data.tools);
  const html = `
      <section class="job-listing" data-id="${data.id}">
        <div class="job-info">
          <p class="job-info__company-name">${data.company}</p>
          ${renderLabel(data)}
          <p class="job-info__job-title">${data.position}</p>
          <p class="job-info__post-time">${data.postedAt}</p>
          <p class="job-info__type">${data.contract}</p>
          <p class="job-info__location">${data.location}</p>
        </div>

        <div class="job-listing__tablets">
          <div class="job-listing__role">
            ${renderTabletButton(data.role)}
          </div>
          <div class="job-listing__level">
            ${renderTabletButton(data.level)}
          </div>
          <div class="job-listing__languages">
            ${renderTabletButton(data.languages)}
          </div>
          <div class="job-listing__tools">
            ${renderTabletButton(data.tools)}
          </div>
        </div>

      </section>
    `;
  return render(parentElement, html, "afterbegin");
}

renderJobListing(jobListingContainer, data[1]);
