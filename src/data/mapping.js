import React from "react";
import { getJson } from "./api";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import routeConstants from "./json/routeConstants";
import stringConstants from "./json/stringConstants";
import LineTooltip from "../components/tooltip/LineTooltip";
import { logActivity } from "../data/logging";

// Performs dropdown selections like Molecules, From ID Type, To ID Type
export const getMappingInit = () => {
  const url = `/idmapping/search_init?query={}`;
  return getJson(url);
};

// Forms objects and displays data in a results (list) page
// Takes selections and inputs in search page and performs search on submit btn
export const getIdMappingSearch = (formObject) => {
  var json = "query=" + JSON.stringify(formObject);
  const url = "/idmapping/search?" + json;
  return getJson(url);
};
