"use strict";
import { async } from "regenerator-runtime";
import * as model from "../model/model";
import * as jobListingView from "../view/jobListingView";
import * as TabletButtonView from "../view/tabletButtonView";
import * as filterView from "../view/filterView";

/* Reset filter object to default values */
/* Clear Job listings */
/* Clear Filter buttons */
/* Render all Job listings after removing old listings*/
async function controlFilterClearButton() {
  model.clearFilterQueries();
  jobListingView.removeJobEntries();
  filterView.removeAllFilterButtons();
  filterView.removeFilterClearButton();
  filterView.removeFilterView();
  jobListingView.renderJobEntries(
    jobListingView.jobListingContainer,
    model.state.jobEntries
  );
  // console.log("[controlFilterClearButton]", model.state.filterQuery);
}

filterView.filterClearButtonClickHandler(controlFilterClearButton);
