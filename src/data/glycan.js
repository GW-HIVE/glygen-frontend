import { getJson, postToAndGetBlob, glycanImageUrl } from "./api";
import { NavLink } from "react-router-dom";
import React from "react";
import { Navbar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import routeConstants from "./json/routeConstants";
import LineTooltip from "../components/tooltip/LineTooltip";
import stringConstants from "./json/stringConstants";

const glycanStrings = stringConstants.glycan.common;

export const getGlycanList = (
  glycanListId,
  offset = 1,
  limit = 20,
  sort = undefined,
  order = "asc"
) => {
  const queryParams = {
    id: glycanListId,
    offset: offset,
    sort: sort,
    limit: limit,
    order: order
  };
  const queryParamString = JSON.stringify(queryParams);
  const url = `/glycan/list?query=${queryParamString}`;
  return getJson(url);
};

export const getGlycanDownload = (id, format, compressed, type, headers) => {
  const query = { id, type, format, compressed };
  const url = `/data/download?query=${JSON.stringify(query)}`;
  return postToAndGetBlob(url, headers);
};

export const getGlycanDetail = accessionId => {
  const url = `/glycan/detail/${accessionId}`;
  return getJson(url);
};

const headerSortingClasses = (column, sortOrder, isLastSorting, colIndex) =>
  sortOrder === "asc" ? "demo-sorting-asc" : "demo-sorting-desc";
export const GLYCAN_COLUMNS = [
  {
    dataField: glycanStrings.glycan_id.id,
    text: glycanStrings.glycan_id.shortName,
    sort: true,
    selected: true,
    headerStyle: (colum, colIndex) => {
      return { backgroundColor: "#4B85B6", color: "white" };
    },

    formatter: (value, row) => (
      <LineTooltip text="View details">
        <Navbar.Text
          as={NavLink}
          to={routeConstants.glycanDetail + row.glytoucan_ac}
        >
          {row.glytoucan_ac}
        </Navbar.Text>
      </LineTooltip>
    )
  },
  {
    text: "Glycan Image",
    sort: false,
    selected: true,
    formatter: (value, row) => (
      <div className="img-wrapper">
        <img
          className="img-cartoon-list-page img-cartoon"
          src={getGlycanImageUrl(row.glytoucan_ac)}
          alt="Cartoon"
        />
      </div>
    ),
    headerStyle: (colum, colIndex) => {
      return {
        width: "30%",
        textAlign: "left",
        backgroundColor: "#4B85B6",
        color: "white"
      };
    }
  },

  {
    dataField: "mass",
    text: "Monoisotopic Mass (Da)",
    sort: true,
    headerStyle: (colum, colIndex) => {
      return { backgroundColor: "#4B85B6", color: "white" };
    },
    selected: true
  },
  // {
  //   dataField: "iupac",
  //   text: "IUPAC",
  //   sort: true,
  //   headerStyle: (colum, colIndex) => {
  //     return { backgroundColor: "#4B85B6", color: "white" };
  //   }
  // },
  // {
  //   dataField: "glycoct",
  //   text: "Glycoct",
  //   sort: true,
  //   headerStyle: (colum, colIndex) => {
  //     return { backgroundColor: "#4B85B6", color: "white" };
  //   },
  //   formatter: (value, row, rowIdx) => {
  //     const txt = value.replace(/\\n/g, "\n");
  //     return (
  //       <CustomPopover
  //         id={rowIdx}
  //         key={rowIdx}
  //         displayText={txt.substring(0, 10) + " ..."}
  //         popOverText={txt}
  //       ></CustomPopover>
  //     );
  //   }
  // },
  {
    dataField: "mass_pme",
    text: "Monoisotopic Mass-pMe (Da)",
    sort: true,
    headerStyle: (colum, colIndex) => {
      return { backgroundColor: "#4B85B6", color: "white" };
    }
  },
  {
    dataField: "number_monosaccharides",
    text: "No of Sugars      ",
    sort: true,
    headerStyle: (colum, colIndex) => {
      return { backgroundColor: "#4B85B6", color: "white" };
    }
  },
  {
    dataField: "number_proteins",
    text: "On How Many GlycoProteins",
    sort: true,
    headerStyle: (colum, colIndex) => {
      return { backgroundColor: "#4B85B6", color: "white" };
    }
  },
  {
    dataField: "number_enzymes",
    text: "How Many Enzymes",
    sort: true,
    headerStyle: (colum, colIndex) => {
      return { backgroundColor: "#4B85B6", color: "white" };
    }
  }
];

const glycanColumnsStorageKey = "glycan-columns";

export const getUserSelectedColumns = () => {
  if (localStorage.getItem(glycanColumnsStorageKey) === null) {
    const defaultSelectedCols = GLYCAN_COLUMNS.filter(col => col.selected).map(
      col => col.text
    );
    localStorage.setItem(glycanColumnsStorageKey, defaultSelectedCols);
    return defaultSelectedCols;
  }

  let selectedFields = [];

  try {
    const parsedValue = localStorage.getItem(glycanColumnsStorageKey);

    if (parsedValue && parsedValue.length) {
      selectedFields = parsedValue;
    }
  } catch (err) {
    selectedFields = [];
  }

  return selectedFields;
};

export const setUserSelectedColumns = arr => {
  localStorage.setItem(glycanColumnsStorageKey, arr);
};

export const getGlycanSearch = formObject => {
  var json = "query=" + JSON.stringify(formObject);
  const url = "/glycan/search?" + json;
  return getJson(url);
};

export const getGlycanSimpleSearch = formObject => {
  var json = "query=" + JSON.stringify(formObject);
  const url = "/glycan/search_simple?" + json;
  return getJson(url);
};

export const getGlycanInit = () => {
  const url = `/glycan/search_init`;
  return getJson(url);
};

export const getGlycanImageUrl = glytoucan_id => {
  return glycanImageUrl + glytoucan_id;
};
