import { getJson } from "./api";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import routeConstants from "./json/routeConstants";
import LineTooltip from "../components/tooltip/LineTooltip";
import stringConstants from "./json/stringConstants";
import { Link } from "react-router-dom";
const proteinStrings = stringConstants.protein.common;

/**
 * Gets JSON for super search list.
 * @param {string} superSearchListId - list id.
 * @param {number} offset - offset value.
 * @param {number} limit - limit value.
 * @param {string} sort - sort field.
 * @param {string} order - order value - asc/desc.
 */
export const getSuperSearchList = (
  superSearchListId,
  offset = 1,
  limit = 20,
  sort = "hit_score",
  order = "desc"
) => {
  const queryParams = {
    id: superSearchListId,
    offset: offset,
    sort: sort,
    limit: limit,
    order: order
  };
  const queryParamString = JSON.stringify(queryParams);
  const url = `/supersearch/list?query=${queryParamString}`;
  return getJson(url);
};

/**
 * Gets JSON for super search init.
 */
export const getSuperSearchInit = () => {
  const url = `/supersearch/search_init?query={}`;
  return getJson(url);
};

/**
 * Gets JSON for super search.
 * @param {object} formObject - super search JSON query object.
 */
export const getSuperSearch = formObject => {
  var json = "query=" + JSON.stringify(formObject);
  const url = "/supersearch/search?" + json;
  return getJson(url);
};

export const getSiteSearch = async queryObject => {
  const {
    proteinId,
    aminoId,
    annotationOperation,
    annotations,
    position,
    minRange,
    maxRange
  } = queryObject;

  const formObject = [];

  if (proteinId) {
    formObject.push({
      concept: "protein",
      query: {
        aggregator: "$and",
        aggregated_list: [],
        unaggregated_list: [
          {
            path: "uniprot_ac",
            order: 0,
            operator: "$eq",
            string_value: proteinId
          }
        ]
      }
    });
  }

  if (
    (minRange && maxRange) ||
    position ||
    (annotations && annotations.length)
  ) {
    const siteQuery = {
      concept: "site",
      query: {
        aggregator: "$and",
        aggregated_list: [],
        unaggregated_list: []
      }
    };
    let order = 0;

    if ((minRange && maxRange) || position) {
      siteQuery.query.unaggregated_list.push({
        path: "start_pos",
        order,
        operator: "$eq",
        numeric_value: minRange ? minRange : position
      });

      order++;

      siteQuery.query.unaggregated_list.push({
        path: "end_pos",
        order,
        operator: "$eq",
        numeric_value: maxRange ? maxRange : position
      });

      order++;
    }

    if (annotations && annotations.length) {
      for (let annotation of annotations) {
        siteQuery.query.unaggregated_list.push({
          path: annotation.id.toLowerCase(),
          order,
          operator: "$gt",
          string_value: []
        });
        order++;
      }
    }

    formObject.push(siteQuery);
  }

  const superSearchData = await getSuperSearch(formObject);
  const listId = superSearchData.data.results_summary.site.list_id;
  // const listLookupData = await getSuperSearchList(listId);
  // return listLookupData.data;
  return listId;
};

const yesNoFormater = (value, row) => {
  return value && value.length ? "YES" : "NO";
};

export const SITE_COLUMNS = [
  {
    dataField: proteinStrings.shortName,
    text: proteinStrings.uniprot_accession.name,
    sort: true,
    selected: true,
    headerStyle: (colum, colIndex) => {
      return { backgroundColor: "#4B85B6", color: "white" };
    },

    formatter: (value, row) => (
      <LineTooltip text="View details">
        <Link to={routeConstants.proteinDetail + row.uniprot_canonical_ac}>
          {row.uniprot_canonical_ac}
        </Link>
      </LineTooltip>
    )
  },
  {
    dataField: "hit_score",
    text: "Hit Score",
    sort: true,
    headerStyle: (colum, colIndex) => {
      return { backgroundColor: "#4B85B6", color: "white" };
    }
  },
  {
    dataField: "start_pos",
    text: "Start_Pos",
    headerStyle: (colum, colIndex) => {
      return { backgroundColor: "#4B85B6", color: "white" };
    }
  },
  {
    dataField: "end_pos",
    text: "End_Pos",
    headerStyle: (colum, colIndex) => {
      return { backgroundColor: "#4B85B6", color: "white" };
    }
  },
  {
    dataField: "snv",
    text: "SNV",
    headerStyle: (colum, colIndex) => {
      return { backgroundColor: "#4B85B6", color: "white" };
    },
    formatter: yesNoFormater
  },
  {
    dataField: "glycosylation",
    text: "Glycosylation",
    headerStyle: (colum, colIndex) => {
      return { backgroundColor: "#4B85B6", color: "white" };
    },
    formatter: yesNoFormater
  },
  {
    dataField: "mutagenesis",
    text: "Mutagenesis",
    headerStyle: (colum, colIndex) => {
      return { backgroundColor: "#4B85B6", color: "white" };
    },
    formatter: yesNoFormater
  },
  {
    dataField: "glycation",
    text: "Glycation",
    headerStyle: (colum, colIndex) => {
      return { backgroundColor: "#4B85B6", color: "white" };
    },
    formatter: yesNoFormater
  },
  {
    dataField: "phosphorylation",
    text: "Phosphorylation",
    headerStyle: (colum, colIndex) => {
      return { backgroundColor: "#4B85B6", color: "white" };
    },
    formatter: yesNoFormater
  }
];
