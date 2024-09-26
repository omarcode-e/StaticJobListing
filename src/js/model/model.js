import { async } from "regenerator-runtime";
import data from "assets/data/data.json";

const state = {
  jobEntries: [...data],
  filters: [],
  filteredEntries: [],
  isFilterOpen: false,
};

async function dispatchFilters(query) {
  if (!query) return;
  if (state.filters.includes(query)) {
    return state.filters.splice(state.filters.indexOf(query), 1);
  }
  return state.filters.push(query);
}

function removeFilter(filter) {
  state.filters = state.filters.filter((q) => q !== filter);
}

function clearFilters() {
  state.filters = [];
}

async function filterJobs(query) {
  await dispatchFilters(query);
  state.filteredEntries = state.jobEntries.filter((job) => {
    const tags = [job.level, job.role].concat(job.languages, job.tools);
    return state.filters.every((f) => tags.includes(f));
  });
  if (state.filteredEntries.length == 0) {
    return [];
  } else {
    return state.filteredEntries;
  }
}

export { state, clearFilters, removeFilter, filterJobs };
