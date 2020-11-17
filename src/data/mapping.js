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
export const getMappingSearch = (formObject) => {
  var json = "query=" + JSON.stringify(formObject);
  const url = "/idmapping/search?" + json;
  return getJson(url);
};

export const getIdMappingResult = (
  motifListId,
  offset = 1,
  limit = 20,
  sort = "input_idlist",
  order = "desc"
) => {
  const queryParams = {
    id: motifListId,
    offset: offset,
    sort: sort,
    limit: limit,
    order: order,
  };
  const queryParamString = JSON.stringify(queryParams);
  const url = `/motif/list?query=${queryParamString}`;
  return getJson(url);
};

export const ID_MAPPING_RESULT = [
  {
    // dataField: "motif_ac",
    dataField: "input_idlist",
    text: "From ID",
    sort: true,
    selected: true,
    headerStyle: () => {
      return { backgroundColor: "#4B85B6", color: "white" };
    },
    // formatter: (value, row) => (
    //   <LineTooltip text="View details">
    //     <Link to={routeConstants.motifDetail + row.motif_ac}>{row.motif_ac}</Link>
    //   </LineTooltip>
    // ),
  },
  {
    dataField: "input_idlist2",
    text: "From ID",
    sort: true,
    headerStyle: (colum, colIndex) => {
      return { backgroundColor: "#4B85B6", color: "white" };
    },
    // formatter: (value, row) => (
    //   <LineTooltip text="View details">
    //     <Link to={routeConstants.motifDetail + row.motif_ac}>{row.motif_name}</Link>
    //   </LineTooltip>
    // ),
  },
  {
    // dataField: "glycan_count",
    dataField: "output_namespace",
    text: "To ID",
    sort: true,
    headerStyle: (colum, colIndex) => {
      return { backgroundColor: "#4B85B6", color: "white" };
    },
    // formatter: (value, row) => (
    //   <LineTooltip text="View details">
    //     <Link to={routeConstants.motifDetail + row.motif_ac}>{row.glycan_count}</Link>
    //   </LineTooltip>
    // ),
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
// export const getIdMappingSearch = (moleculeId, inputNamespace, outputNNamespace, inputIdList) => {
//   const queryParamString = JSON.stringify({
//     recordtype: moleculeId,
//     input_namespace: inputNamespace,
//     output_namespace: outputNNamespace,
//     input_idlist: inputIdList,
//   });
//   const url = `/idmapping/search?query=${queryParamString}`;
//   return getJson(url);
// };
