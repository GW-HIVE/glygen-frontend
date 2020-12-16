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
  mappingId,
  category
  // offset = 1,
  // limit = 20,
  // sort = undefined,
  // order = "desc"
) => {
  const queryParams = {
    id: mappingId,
    category: category,
    // sort: sort,
    // offset: offset,
    // limit: limit,
    // order: order,
  };
  const queryParamString = JSON.stringify(queryParams);
  const url = `/idmapping/list/?query=${queryParamString}`;
  return getJson(url);
};

export const ID_MAPPING_RESULT = [
  {
    // dataField: mapStrings.shortName,
    // text: mapStrings.input_idlist.name,
    dataField: "from",
    formatter: (value, row) => {
      return value + " " + row.data.cache_info.legends.from;
    },
    text: "From ID",
    sort: true,
    selected: true,
  },
  {
    dataField: "anchor",
    formatter: (value, row) => {
      return value + " " + row.data.cache_info.legends.anchor;
    },
    text: "Internal ID",
    sort: true,
  },
  {
    dataField: "to",
    formatter: (value, row) => {
      return value + " " + row.data.cache_info.legends.to;
    },
    text: "To ID",
    sort: true,
  },
];
export const ID_MAP_REASON = [
  {
    dataField: "input_id",
    text: "Input ID",
    sort: true,
    selected: true,
  },
  {
    dataField: "reason",
    text: "Reason Not Mapped",
    sort: true,
  },
];
