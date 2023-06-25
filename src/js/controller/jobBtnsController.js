"use strict";
import { async } from "regenerator-runtime";
import * as model from "../model/model";
import * as jobListingView from "../view/jobListingView";
import * as TabletButtonView from "../view/tabletButtonView";
import * as filterView from "../view/filterView";

async function controlJobButtons(e) {
  const buttonValue = e.target.value;

  // Check if clicked filter button already exist
  if (!model.state.filterQuery.includes(buttonValue)) {
    filterView.addFilterButton(buttonValue);
  } else {
    filterView.removeFilterButton(buttonValue);
  }

  const filteredEntries = await model.filterJobEntries(buttonValue);

  if (filteredEntries.length === 0) {
    jobListingView.removeJobEntries();
    filterView.removeAllFilterButtons();
    filterView.removeFilterClearButton();
    filterView.removeFilterView();
    model.state.isFilterOpen = false;
    return jobListingView.renderJobEntries(
      jobListingView.jobListingContainer,
      model.state.jobEntries
    );
  }
  if (!model.state.isFilterOpen) {
    filterView.addFilterClearButton();
    model.state.isFilterOpen = true;
  }

  jobListingView.removeJobEntries();
  jobListingView.renderJobEntries(
    jobListingView.jobListingContainer,
    filteredEntries
  );
}

TabletButtonView.TabletClickHandler(controlJobButtons);
