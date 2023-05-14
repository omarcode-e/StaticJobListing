import { async } from "regenerator-runtime";
import data from "../../data/data.json";

const state = {
  jobEntries: data,
  filterQuery: [],
};

async function dispatchFilterQuery(query) {
  if (state.filterQuery.includes(query)) {
    return state.filterQuery.splice(state.filterQuery.indexOf(query), 1);
  }
  return state.filterQuery.push(query);
}

function removeFilterQuery(inputQuery) {
  return (state.filterQuery = state.filterQuery.filter(
    (q) => q !== inputQuery
  ));
}

function clearFilterQueries() {
  return (state.filterQuery = []);
}

function filterArrayByPropAndValue(array, prop, value = []) {
  return array.filter((el) => value.includes(el[prop]));
}

function filterNestedArray(array, prop, i = 0, tempArr = []) {
  if (i === array.length) return tempArr;
  state.filterQuery.forEach(
    (q) => array[i][prop].includes(q) && tempArr.push(array[i])
  );
  return filterNestedArray(array, prop, i + 1, tempArr);
}

function filterRole(data, filterQueries) {
  return filterArrayByPropAndValue(data, "role", filterQueries);
}

function filterLanguages(data) {
  return filterNestedArray(data, "languages");
}

function filterTools(data) {
  return filterNestedArray(data, "tools");
}

function filterLevel(data, filterQueries) {
  return filterArrayByPropAndValue(data, "level", filterQueries);
}

function removeDuplicate(arr) {
  return Array.from(new Set(arr));
}

const isSameRole = function (result, filterQueries) {
  return filterQueries.includes(result.role);
};
const isSameLanguage = function (result, filterQueries) {
  return result.languages.some((q) => filterQueries.includes(q));
};
const isSameTool = function (result, filterQueries) {
  return filterQueries.some((q) => result.tools.includes(q));
};
const isSameLevel = function (result, filterQueries) {
  return filterQueries.includes(result.level);
};

const matchAllCategories = function (arr, filterQueries) {
  return arr.filter((arr) => {
    return (
      (isSameRole(arr, filterQueries) &&
        isSameLevel(arr, filterQueries) &&
        isSameLanguage(arr, filterQueries)) ||
      isSameTool(arr, filterQueries)
    );
  });
};

async function filterJobEntries(query) {
  dispatchFilterQuery(query);
  const filteredRole = filterRole(state.jobEntries, state.filterQuery);
  const filteredLevel = filterLevel(state.jobEntries, state.filterQuery);
  const filteredTools = filterTools(state.jobEntries, query);
  const filteredLanguages = filterLanguages(state.jobEntries, query);
  const filteredEntries = removeDuplicate([
    ...filteredRole,
    ...filteredLevel,
    ...filteredLanguages,
    ...filteredTools,
  ]);
  const specificFilteredEntries = matchAllCategories(
    state.jobEntries,
    state.filterQuery
  );

  return specificFilteredEntries.length === 0
    ? filteredEntries
    : specificFilteredEntries;
}

export { state, clearFilterQueries, removeFilterQuery, filterJobEntries };
