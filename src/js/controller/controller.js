"use strict";
import { async } from "regenerator-runtime";
import * as model from "../model/model";
import * as jobListingView from "../view/jobListingView";
import * as TabletButtonView from "../view/tabletButtonView";
import * as filterView from "../view/filterView";

async function controlJobListing() {
  jobListingView.renderJobEntries(
    jobListingView.jobListingContainer,
    model.state.jobEntries
  );
}

async function controlJobButtons(e) {
  const buttonValue = TabletButtonView.getTabletValue(e);
  const filteredEntries = await model.filterJobEntries(buttonValue);
  // Render all job entries if there are no filtered results,
  // Else render filtered results
  // console.log("[contorJobButtons]", model.state.filterQuery);
  if (filteredEntries.length === 0) {
    jobListingView.removeJobEntries();
    filterView.removeAllFilterButtons();
    return jobListingView.renderJobEntries(
      jobListingView.jobListingContainer,
      model.state.jobEntries
    );
  }

  jobListingView.removeJobEntries();
  filterView.addFilterButton(model.state.filterQuery);
  filterView.addFilterClearButton();
  jobListingView.renderJobEntries(
    jobListingView.jobListingContainer,
    filteredEntries
  );
}

async function controlFilterButtons(e) {
  filterView.removeFilterButton(e.target.value);
  model.removeFilterQuery(e.target.value);
  if (model.state.filterQuery.length === 0) {
    filterView.removeAllFilterButtons();
  }
  // console.log("[contorFilterButtons]", model.state.filterQuery);
  jobListingView.renderJobEntries(
    jobListingView.jobListingContainer,
    model.state.jobEntries
  );
}

/* Reset filter object to default values */
/* Clear Job listings */
/* Clear Filter buttons */
/* Render all Job listings after removing old listings*/
async function controlFilterClearButton() {
  model.clearFilterQueries();
  jobListingView.removeJobEntries();
  filterView.removeAllFilterButtons();
  jobListingView.renderJobEntries(
    jobListingView.jobListingContainer,
    model.state.jobEntries
  );
  // console.log("[controlFilterClearButton]", model.state.filterQuery);
}

controlJobListing();
filterView.filterView();
filterView.filterClearButtonClickHandler(controlFilterClearButton);
filterView.filterClickHandler(controlFilterButtons);
TabletButtonView.TabletClickHandler(controlJobButtons);
