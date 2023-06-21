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
  let isFilterVisible = false;
  // Render all job entries if there are no filtered results,
  // Else render filtered results
  // console.log("[contorJobButtons]", model.state.filterQuery);
  // if (!isFilterVisible) {
  //   filterView.removeFilterView();
  //   filterView.renderFilterView();
  //   isFilterVisible = true;
  // }

  if (filteredEntries.length === 0) {
    jobListingView.removeJobEntries();
    filterView.removeAllFilterButtons();
    filterView.removeFilterView();
    // isFilterVisible = false;
    return jobListingView.renderJobEntries(
      jobListingView.jobListingContainer,
      model.state.jobEntries
    );
  }

  filterView.addFilterButton(model.state.filterQuery);
  filterView.addFilterClearButton();
  jobListingView.removeJobEntries();
  jobListingView.renderJobEntries(
    jobListingView.jobListingContainer,
    filteredEntries
  );
}

async function controlFilterButtons(e) {
  filterView.removeFilterButton(e.target.value);
  model.removeFilterQuery(e.target.value);
  jobListingView.removeJobEntries();
  if (model.state.filterQuery.length === 0) {
    filterView.removeAllFilterButtons();
    filterView.removeFilterView();
    return jobListingView.renderJobEntries(
      jobListingView.jobListingContainer,
      model.state.jobEntries
    );
  }

  const filteredEntries = await model.filterJobEntries(null);
  jobListingView.renderJobEntries(
    jobListingView.jobListingContainer,
    filteredEntries
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
  filterView.removeFilterView();
  jobListingView.renderJobEntries(
    jobListingView.jobListingContainer,
    model.state.jobEntries
  );
  // console.log("[controlFilterClearButton]", model.state.filterQuery);
}

controlJobListing();
filterView.renderFilterView();
filterView.filterClearButtonClickHandler(controlFilterClearButton);
filterView.filterClickHandler(controlFilterButtons);
TabletButtonView.TabletClickHandler(controlJobButtons);
