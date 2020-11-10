import React from "react";
import { getJson } from "./api";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import routeConstants from "./json/routeConstants";
import stringConstants from "./json/stringConstants";
import LineTooltip from "../components/tooltip/LineTooltip";
import { logActivity } from "../data/logging";

export const getMappingInit = () => {
  const url = `/idmapping/search_init?query={}`;
  return getJson(url);
};

// /idmapping/search?query={"recordtype":"glycan","input_namespace":"PubChem Compound","output_namespace":"ChEBI","input_idlist":["aaa","91859018","91845230","91845682"]}
export const getIdMappingSearch = (molecule, fromIdType, toIdType, mappingID) => {
  const queryParamString = JSON.stringify({
    recordtype: molecule,
    input_namespace: fromIdType,
    output_namespace: toIdType,
    input_idlist: mappingID,
  });
  const url = `/idmapping/search?query=${queryParamString}`;
  return getJson(url);
};
