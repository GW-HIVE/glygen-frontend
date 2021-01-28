import { postTo, postFormDataTo, postToAndGetBlob } from "./api";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import stringConstants from "./json/stringConstants";
import { logActivity } from "../data/logging";

const unmappedStrings = stringConstants.id_mapping.common.unmapped;

// Performs dropdown selections: Molecules, From ID Type, To ID Type
export const getMappingInit = () => {
  const url = `/idmapping/search_init?query={}`;
  return postTo(url);
};

// Forms objects and displays data in a results (list) page
// Takes selections and inputs in search page and performs search on submit btn
export const getMappingSearch = (formObject) => {
  // var json = "query=" + JSON.stringify(formObject);
  const url = "/idmapping/search"; //+ json;
  return postFormDataTo(url, formObject);
};

export const getMappingList = (
  //Do NOT change the order it will brake table sorting and pagination
  mappingId,
  category = "mapped",
  limit = 20,
  sort = "from",
  order = "asc",
  offset = 1
) => {
  const queryParams = {
    //Do NOT change the order it will brake table sorting and pagination
    id: mappingId,
    category: "mapped",
    sort: sort,
    limit: limit,
    order: order,
    offset: offset,
  };
  const queryParamString = JSON.stringify(queryParams);
  const url = `/idmapping/list/?query=${queryParamString}`;
  return postTo(url);
};

export const getMappingListUnmapped = (
  mappingId,
  category = "unmapped",
  limit = 20,
  sort = "input_id",
  order = "asc",
  offset = 1
) => {
  const queryParams = {
    id: mappingId,
    category: "unmapped",
    sort: sort,
    limit: limit,
    order: order,
    offset: offset,
  };
  const queryParamString = JSON.stringify(queryParams);
  const url = `/idmapping/list/?query=${queryParamString}`;
  return postTo(url);
};

export const getIdMappingMappedDownload = (id, format, compressed, type, headers) => {
  let message = "idMapping mapped downloaded successfully ";
  logActivity("user", id, format, compressed, "No results. " + message);
  const query = { id, type, format, compressed };
  const url = `/data/download?query=${JSON.stringify(query)}`;
  return postToAndGetBlob(url, headers);
};
export const getIdMappingUnmappedDownload = (id, format, compressed, type, headers) => {
  let message = "idMapping unmapped downloaded successfully ";
  logActivity("user", id, format, compressed, "No results. " + message);
  const query = { id, type, format, compressed };
  const url = `/data/download?query=${JSON.stringify(query)}`;
  return postToAndGetBlob(url, headers);
};

export const ID_MAP_REASON = [
  {
    dataField: unmappedStrings.input_id.shortName,
    text: unmappedStrings.input_id.name,
    sort: true,
    selected: true,
  },
  {
    dataField: unmappedStrings.reason.shortName,
    text: unmappedStrings.reason.name,
    sort: true,
  },
];
