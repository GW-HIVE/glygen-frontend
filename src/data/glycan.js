import { getJson } from "./api";
// import { ROOT_API_URL } from "./api";
import React, { useState } from "react";
import { Popover, PopoverHeader, PopoverBody } from "reactstrap";
import CustomPopover from "../components/CustomPopover";
// import BootstrapTable from "react-bootstrap-table-next";

export const getGlycanList = (glycanListId, offset = 1) => {
  const url = `/glycan/list?query={"id":"${glycanListId}","offset":${offset},"limit":20,"order":"asc"}`;
  return getJson(url);
};

export const getGlycanDetail = accessionId => {
  const url = `/glycan/detail/${accessionId}`;
  return getJson(url);
};

const glycanImageUrl = "https://api.glygen.org/glycan/image/";
const glycanListId = " ";
export const GLYCAN_COLUMNS = [
  {
    dataField: "glytoucan_ac",
    text: "Glycan ID",
    sort: true,
    selected: true,
    formatter: (value, row) => (
      <span>
        <a href={`/glycan-detail/${row.glytoucan_ac}`}>{row.glytoucan_ac}</a>
      </span>
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
      return { width: "30%", textAlign: "left" };
    }
  },

  { dataField: "mass", text: "Mass", sort: true, selected: true },
  {
    dataField: "iupac",
    text: "IUPAC",
    sort: true
  },
  {
    dataField: "glycoct",
    text: "Glycoct",
    sort: true,
    formatter: (value, row, rowIdx) => {
      const txt = value.replace(/\\n/g, "\n");
      return (
        <CustomPopover
          id={rowIdx}
          key={rowIdx}
          displayText={txt.substring(0, 10) + " ..."}
          popOverText={txt}
        ></CustomPopover>
      );
    }
  },
  { dataField: "mass_pme", text: "Mass_Pme", sort: true },
  { dataField: "number_enzymes", text: "No.of Enzyme", sort: true },
  { dataField: "number_proteins", text: "No.of Protein", sort: true },
  { dataField: "number_monosaccharides", text: "No. of Sugar", sort: true }
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
