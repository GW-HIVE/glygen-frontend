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

const constructSiteSearchObject = queryObject => {
  const {
    proteinId,
    aminoId,
    annotationOperation,
    annotations,
    position,
    minRange,
    maxRange
  } = queryObject;

  let min = minRange || position || maxRange;
  let max = maxRange || position || minRange;

  const formObject = [];

  if (proteinId && proteinId.length) {
    formObject.push({
      concept: "protein",
      query: {
        aggregator: "$and",
        aggregated_list: [],
        unaggregated_list: proteinId.map((protein, index) => ({
          path: "uniprot_ac",
          order: index,
          operator: "$eq",
          string_value: protein
        }))
      }
    });
  }

  if (min || max || (annotations && annotations.length)) {
    const siteQuery = {
      concept: "site",
      query: {
        aggregator: "$and",
        aggregated_list: [],
        unaggregated_list: []
      }
    };
    let order = 0;

    if (min || max) {
      siteQuery.query.unaggregated_list.push({
        path: "start_pos",
        order,
        operator: "$eq",
        numeric_value: min
      });

      order++;

      siteQuery.query.unaggregated_list.push({
        path: "end_pos",
        order,
        operator: "$eq",
        numeric_value: max
      });

      order++;
    }

    if (annotations && annotations.length) {
      let targetList = siteQuery.query.unaggregated_list;

      if (annotationOperation === "or") {
        const aggregator = {
          aggregator: "$or",
          unaggregated_list: []
        };

        siteQuery.query.aggregated_list.push(aggregator);

        targetList = aggregator.unaggregated_list;
      }

      for (let annotation of annotations) {
        targetList.push({
          path: annotation,
          order,
          operator: "$gt",
          string_value: []
        });
        order++;
      }
    }

    formObject.push(siteQuery);
  }

  return formObject;
};

export const getSiteSearch = async queryObject => {
  const formObject = constructSiteSearchObject(queryObject);
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
    sort: true,
    headerStyle: (colum, colIndex) => {
      return { backgroundColor: "#4B85B6", color: "white" };
    }
  },
  {
    dataField: "end_pos",
    text: "End_Pos",
    sort: true,
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

export const createSiteQuerySummary = query => {
  let result = {};

  for (let querySection of query) {
    // for (let listItem of querySection.query.unaggregated_list) {
    //   if (listItem.path === "uniprot_ac") {
    //     if (!result.proteinId) {
    //       result.proteinId = [];
    //     }
    //     result.proteinId.push(listItem.string_value);
    //   } else if (
    //     ["glycosylation", "snv", "mutagenesis"].includes(listItem.path)
    //   ) {
    //     if (!result.annotations) {
    //       result.annotations = [];
    //     }
    //     result.annotations.push(listItem.path);
    //   }
    // }
  }

  return result;
};
