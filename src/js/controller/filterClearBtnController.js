"use strict";
import { async } from "regenerator-runtime";
import { model } from "@model";
import { jobListingView, filterView } from "@view";

/* Reset filter object to default values */
/* Clear Job listings */
/* Clear Filter buttons */
/* Render all Job listings after removing old listings*/
async function controlFilterClearButton() {
  model.clearFilters();
  jobListingView.removeJobEntries();
  filterView.removeAllFilterButtons();
  filterView.removeFilterClearButton();
  model.state.isFilterOpen = false;
  filterView.removeFilterView();
  jobListingView.renderJobEntries(
    jobListingView.jobListingContainer,
    model.state.jobEntries
  );
  // console.log("[controlFilterClearButton]", model.state.filters);
}

filterView.filterClearButtonClickHandler(controlFilterClearButton);
