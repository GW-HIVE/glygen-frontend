import { getJson } from "./api";

export const getGlycanList = (glycanListId, offset = 1) => {
  const url = `/glycan/list?query={"id":"${glycanListId}","offset":${offset},"limit":20,"order":"asc"}`;

  //            /protein/list?query={"id":"2f5f963be06fd39152da2a54508a9935","offset":1,"limit":20,"sort":"uniprot_canonical_ac","order":"asc"}'

  return getJson(url);
};

export const GLYCAN_COLUMNS = [
  { dataField: "glytoucan_ac", text: "Glycan ID", sort: true, selected: true },
  { dataField: "mass", text: "Mass", sort: true, selected: true },
  { dataField: "iupac", text: "IUPAC", sort: true, selected: true },
  { dataField: "glycoct", text: "Glycoct", sort: true },
  { dataField: "mass_pme", text: "Mass_Pme", sort: true },
  { dataField: "number_enzymes", text: "No.of Enzyme", sort: true },
  { dataField: "number_proteins", text: "No.of Protein", sort: true },
  { dataField: "number_monosaccharides", text: "No. of Sugar", sort: true }
];

const glycanColumnsStorageKey = "glycan-columns";

export const getUserSelectedColumns = () => {
  let selectedFields = [];

  try {
    const parsedValue = JSON.parse(
      localStorage.getItem(glycanColumnsStorageKey)
    );

    if (parsedValue && parsedValue.length) {
      selectedFields = parsedValue;
    }
  } catch (err) {
    selectedFields = [];
  }

  return selectedFields;
};

export const setUserSelectedColumns = arr => {
  localStorage.setItem(glycanColumnsStorageKey, JSON.stringify(arr));
};
