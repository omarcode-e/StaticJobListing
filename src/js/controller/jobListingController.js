"use strict";
import { async } from "regenerator-runtime";
import { model } from "@model";
import { jobListingView } from "@view";

async function controlJobListing() {
  jobListingView.renderJobEntries(
    jobListingView.jobListingContainer,
    model.state.jobEntries
  );
}

controlJobListing();
