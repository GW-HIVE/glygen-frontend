import { postTo, postFormDataTo } from "./api";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import stringConstants from "./json/stringConstants";
const unmappedStrings = stringConstants.id_mapping.common.unmapped;

// Performs dropdown selections: Molecules, From ID Type, To ID Type
export const getMappingInit = () => {
  const url = `/idmapping/search_init?query={}`;
  return postTo(url);
};

// Forms objects and displays data in a results (list) page
// Takes selections and inputs in search page and performs search on submit btn
export const getMappingSearch = formObject => {
  // var json = "query=" + JSON.stringify(formObject);
  const url = "/idmapping/search"; //+ json;
  return postFormDataTo(url, formObject);
};

export const getMappingList = mappingId => {
  const queryParams = {
    id: mappingId,
    category: "mapped"
  };
  const queryParamString = JSON.stringify(queryParams);
  const url = `/idmapping/list/?query=${queryParamString}`;
  return postTo(url);
};

export const getMappingListUnmapped = mappingId => {
  const queryParams = {
    id: mappingId,
    category: "unmapped"
  };
  const queryParamString = JSON.stringify(queryParams);
  const url = `/idmapping/list/?query=${queryParamString}`;
  return postTo(url);
};

export const ID_MAP_REASON = [
  {
    dataField: unmappedStrings.input_id.shortName,
    text: unmappedStrings.input_id.name,
    sort: true,
    selected: true
  },
  {
    dataField: unmappedStrings.reason.shortName,
    text: unmappedStrings.reason.name,
    sort: true
  }
];
