"use strict";
import { async } from "regenerator-runtime";
import { model } from "@model";
import { jobListingView, tabletButtonView, filterView } from "@view";

async function controlJobButtons(e) {
  const buttonValue = e.target.value;

  // Check if clicked filter button already exist
  if (!model.state.filters.includes(buttonValue)) {
    filterView.addFilterButton(buttonValue);
  } else {
    filterView.removeFilterButton(buttonValue);
  }

  const filteredEntries = await model.filterJobs(buttonValue);

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

tabletButtonView.tabletClickHandler(controlJobButtons);
