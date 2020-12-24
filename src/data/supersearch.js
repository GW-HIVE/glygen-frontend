import { getJson, postToAndGetBlob, glycanImageUrl } from "./api";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import routeConstants from "./json/routeConstants";
import LineTooltip from "../components/tooltip/LineTooltip";
import stringConstants from "./json/stringConstants";
import { logActivity } from "../data/logging";
import { Link } from "react-router-dom";

const glycanStrings = stringConstants.glycan.common;

/**
 * Gets JSON for glycan search init.
 */
export const getSuperSearchInit = () => {
    const url = `/supersearch/search_init?query={}`;
    return getJson(url);
  };

  /**
 * Gets JSON for glycan search.
 * @param {object} formObject - glycan search JSON query object.
 */
export const getSuperSearch = formObject => {
    var json = "query=" + JSON.stringify(formObject);
    const url = "/supersearch/search?" + json;
    return getJson(url);
  };


export const getSuperSearchList = (
    glycanListId,
    offset = 1,
    limit = 20,
    sort = "hit_score",
    order = "desc"
  ) => {
    const queryParams = {
      id: glycanListId,
      offset: offset,
      sort: sort,
      limit: limit,
      order: order
    };
    const queryParamString = JSON.stringify(queryParams);
    const url = `/supersearch/list?query=${queryParamString}`;
    return getJson(url);
  };