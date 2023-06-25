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

controlJobListing();
