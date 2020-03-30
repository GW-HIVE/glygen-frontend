import { getJson, postTo } from "./api";
import { NavLink } from "react-router-dom";
import React from "react";
import CustomPopover from "../components/CustomPopover";
import { Navbar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

export const getGlycanList = (
  glycanListId,
  offset = 1,
  limit = 20,
  sort = "glytoucan_ac",
  order = "asc"
) => {
  const url = `/glycan/list?query={"id":"${glycanListId}","offset":${offset},"sort":"${sort}","limit":${limit},"order":"${order}"}`;
  return getJson(url);
};

export const getGlycanDownload = (id, format, compressed, type, fields) => {
  const query = { id, type, format, compressed };
  const url = `/data/download?query=${JSON.stringify(query)}`;
  return postTo(url, {
    headers: fields
  });
};

export const getGlycanDetail = accessionId => {
  const url = `/glycan/detail/${accessionId}`;
  return getJson(url);
};

const glycanImageUrl = "https://api.glygen.org/glycan/image/";
const headerSortingClasses = (column, sortOrder, isLastSorting, colIndex) =>
  sortOrder === "asc" ? "demo-sorting-asc" : "demo-sorting-desc";
export const GLYCAN_COLUMNS = [
  {
    dataField: "glytoucan_ac",
    text: "Glycan ID",
    sort: true,
    selected: true,
    headerStyle: (colum, colIndex) => {
      return { backgroundColor: "#4B85B6", color: "white" };
    },

    formatter: (value, row) => (
      <Navbar.Text as={NavLink} to={`/glycan-detail/${row.glytoucan_ac}`}>
        {row.glytoucan_ac}
      </Navbar.Text>
    )
  },
  {
    text: "Glycan Image",
    sort: false,
    selected: true,
    formatter: (value, row) => (
      <div className="img-wrapper">
        <img
          className="img-cartoon"
          src={glycanImageUrl + row.glytoucan_ac}
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
    text: "Mass",
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
    text: "Mass_Pme",
    sort: true,
    headerStyle: (colum, colIndex) => {
      return { backgroundColor: "#4B85B6", color: "white" };
    }
  },
  {
    dataField: "number_enzymes",
    text: "No.of Enzyme",
    sort: true,
    headerStyle: (colum, colIndex) => {
      return { backgroundColor: "#4B85B6", color: "white" };
    }
  },
  {
    dataField: "number_proteins",
    text: "No.of Protein",
    sort: true,
    headerStyle: (colum, colIndex) => {
      return { backgroundColor: "#4B85B6", color: "white" };
    }
  },
  {
    dataField: "number_monosaccharides",
    text: "No. of Sugar",
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
