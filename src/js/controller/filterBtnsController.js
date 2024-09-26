"use strict";
import { async } from "regenerator-runtime";
import * as model from "../model/model";
import * as jobListingView from "../view/jobListingView";
import * as filterView from "../view/filterView";

async function controlFilterButtons(e) {
  filterView.removeFilterButton(e.target.value);
  model.removeFilter(e.target.value);
  jobListingView.removeJobEntries();
  model.state.isFilterOpen = false;
  if (model.state.filters.length === 0) {
    filterView.removeAllFilterButtons();
    filterView.removeFilterClearButton();
    filterView.removeFilterView();
    return jobListingView.renderJobEntries(
      jobListingView.jobListingContainer,
      model.state.jobEntries
    );
  }

  const filteredEntries = await model.filterJobs(null);
  jobListingView.renderJobEntries(
    jobListingView.jobListingContainer,
    filteredEntries
  );
}

filterView.renderFilterView();
filterView.filterClickHandler(controlFilterButtons);
