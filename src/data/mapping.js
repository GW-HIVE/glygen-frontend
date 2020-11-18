import { getJson } from "./api";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
// import stringConstants from "./json/stringConstants";
// import { logActivity } from "../data/logging";

// const mapStrings = stringConstants.mapping.common;

// Performs dropdown selections: Molecules, From ID Type, To ID Type
export const getMappingInit = () => {
  const url = `/idmapping/search_init?query={}`;
  return getJson(url);
};

// Forms objects and displays data in a results (list) page
// Takes selections and inputs in search page and performs search on submit btn
export const getMappingSearch = (formObject) => {
  var json = "query=" + JSON.stringify(formObject);
  const url = "/idmapping/search?" + json;
  return getJson(url);
};

export const getMappingList = (
  mappingListId,
  offset = 1,
  limit = 20,
  sort = undefined,
  order = "asc"
) => {
  const queryParams = {
    id: mappingListId,
    offset: offset,
    sort: sort,
    limit: limit,
    order: order,
  };
  const queryParamString = JSON.stringify(queryParams);
  const url = `/protein/list?query=${queryParamString}`;
  return getJson(url);
};

export const ID_MAPPING_RESULT = [
  {
    // dataField: mapStrings.shortName,
    // text: mapStrings.input_idlist.name,
    dataField: "input_idlist",
    text: "From ID",
    sort: true,
    selected: true,
    headerStyle: () => {
      return { backgroundColor: "#4B85B6", color: "white" };
    },
  },
  {
    dataField: "input_idlist2",
    text: "From ID",
    sort: true,
    headerStyle: (colum, colIndex) => {
      return { backgroundColor: "#4B85B6", color: "white" };
    },
  },
  {
    // dataField: "glycan_count",
    dataField: "output_namespace",
    text: "To ID",
    sort: true,
    headerStyle: (colum, colIndex) => {
      return { backgroundColor: "#4B85B6", color: "white" };
    },
  },
];
export const ID_MAP_REASON = [
  {
    // dataField: "motif_ac",
    dataField: "input_idlist",
    text: "IDs",
    sort: true,
    selected: true,
    headerStyle: () => {
      return { backgroundColor: "#4B85B6", color: "white", width: "20%" };
    },
  },
  {
    dataField: "input_idlist2",
    text: "Reason",
    sort: true,
    headerStyle: (colum, colIndex) => {
      return { backgroundColor: "#4B85B6", color: "white", width: "20%" };
    },
  },
];
