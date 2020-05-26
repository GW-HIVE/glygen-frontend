import { getJson, postToAndGetBlob } from "./api";

import { NavLink } from "react-router-dom";
import React from "react";
import { Navbar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import routeConstants from "./json/routeConstants";
import stringConstants from "./json/stringConstants";

const proteinStrings = stringConstants.protein.common;

export const getProteinList = (
  protienListId,
  offset = 1,
  limit = 20,
  sort = undefined,
  order = "asc"
) => {
  const queryParams = {
    id: protienListId,
    offset: offset,
    sort: sort,
    limit: limit,
    order: order
  };
  const queryParamString = JSON.stringify(queryParams);
  const url = `/protein/list?query=${queryParamString}`;
  return getJson(url);
};

export const getProteinDetail = accessionId => {
  const url = `/protein/detail/${accessionId}`;

  return getJson(url);
};
export const getProteinDownload = (id, format, compressed, type, headers) => {
  const query = { id, type, format, compressed };
  const url = `/data/download?query=${JSON.stringify(query)}`;
  return postToAndGetBlob(url, headers);
};

export const PROTEIN_COLUMNS = [
  {
    dataField: proteinStrings.shortName,
    text: proteinStrings.uniprot_accession.name,
    sort: true,
    selected: true,
    headerStyle: (colum, colIndex) => {
      return { backgroundColor: "#4B85B6", color: "white" };
    },

    formatter: (value, row) => (
      <Navbar.Text
        as={NavLink}
        to={routeConstants.proteinDetail + row.uniprot_canonical_ac}
      >
        {row.uniprot_canonical_ac}
      </Navbar.Text>
    )
  },
  {
    dataField: proteinStrings.gene_name.shortName,
    text: proteinStrings.gene_name.name,
    sort: true,
    headerStyle: (colum, colIndex) => {
      return { backgroundColor: "#4B85B6", color: "white" };
    }
  },

  {
    dataField: proteinStrings.protein_name_long.shortName,
    text: proteinStrings.protein_name_long.name,
    sort: true,
    headerStyle: (colum, colIndex) => {
      return { backgroundColor: "#4B85B6", color: "white" };
    }
  },
  {
    dataField: proteinStrings.mass.shortName,
    text: proteinStrings.mass.name + " (Da)",
    sort: true,
    headerStyle: (colum, colIndex) => {
      return { backgroundColor: "#4B85B6", color: "white" };
    }
  },
  {
    dataField: proteinStrings.organism.shortName,
    text: proteinStrings.organism.name,
    sort: true,
    headerStyle: (colum, colIndex) => {
      return { backgroundColor: "#4B85B6", color: "white" };
    }
  },
  {
    dataField: proteinStrings.refSeq_name.shortName,
    text: proteinStrings.refSeq_name.name,
    sort: true,
    headerStyle: (colum, colIndex) => {
      return { backgroundColor: "#4B85B6", color: "white" };
    }
  },
  {
    dataField: proteinStrings.refseq_ac.shortName,
    text: proteinStrings.refseq_ac.name,
    sort: true,
    headerStyle: (colum, colIndex) => {
      return { backgroundColor: "#4B85B6", color: "white" };
    }
  }
];

export const getProteinSearch = formObject => {
  var json = "query=" + JSON.stringify(formObject);
  const url = "/protein/search?" + json;
  return getJson(url);
};

export const getProteinSimpleSearch = formObject => {
  var json = "query=" + JSON.stringify(formObject);
  const url = "/protein/search_simple?" + json;
  return getJson(url);
};

export const getProteinInit = () => {
  const url = `/protein/search_init`;
  return getJson(url);
};