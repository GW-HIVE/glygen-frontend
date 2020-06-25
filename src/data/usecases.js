import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar } from "react-bootstrap";
import { getJson } from "./api";
import routeConstants from "./json/routeConstants";
import stringConstants from "./json/stringConstants";
import LineTooltip from "../components/tooltip/LineTooltip";
import { groupEvidences } from "../data/data-format";
import EvidenceList from "../components/EvidenceList";
import Nav from 'react-bootstrap/Nav'

const proteinStrings = stringConstants.protein.common;


export const getGlycanToBiosynthesisEnzymes = (organism, glycanId) => {
    const url = "/usecases/glycan_to_biosynthesis_enzymes/" + organism + "/" + glycanId;
    return getJson(url);
}

export const getGlycanToGlycoproteins = (organism, glycanId) => {
    const url = "/usecases/glycan_to_glycoproteins/" + organism + "/" + glycanId;
    return getJson(url);
}

export const getGlycanToEnzymeGeneLoci = (organism, glycanId) => {
    const url = "/usecases/glycan_to_enzyme_gene_loci/" + organism + "/" + glycanId;
    return getJson(url);
}


export const LOCUS_COLUMNS = [
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
          <Navbar.Text
            as={NavLink}
            to={routeConstants.proteinDetail + row.uniprot_canonical_ac}
          >
            {row.uniprot_canonical_ac}
          </Navbar.Text>
        </LineTooltip>
      )
    },
    {
      dataField: proteinStrings.gene_name.id,
      text: proteinStrings.gene_name.name,
      sort: true,
      headerStyle: (colum, colIndex) => {
        return { backgroundColor: "#4B85B6", color: "white" };
      },

      formatter: (value, row) => (
        <LineTooltip text="View details">
          <Nav.Link
            href={row.gene_link}
          >
            {row.gene_name}
          </Nav.Link>
        </LineTooltip>
      )
    },
    {
        dataField: proteinStrings.chromosome.id,
        text: proteinStrings.gene_location.name,
        sort: true,
        headerStyle: (colum, colIndex) => {
          return { backgroundColor: "#4B85B6", color: "white" };
        },

        formatter: (value, row) => (
            <>
             Chr {row.chromosome} ({row.start_pos} - {row.end_pos})
            </>
        )
    },
    {
      dataField: proteinStrings.protein_name.id,
      text: proteinStrings.protein_name.name,
      sort: true,
      headerStyle: (colum, colIndex) => {
        return { backgroundColor: "#4B85B6", color: "white" };
      }
    },
    {
      dataField: proteinStrings.organism.id,
      text: proteinStrings.organism.name,
      sort: true,
      headerStyle: (colum, colIndex) => {
        return { backgroundColor: "#4B85B6", color: "white" };
      }
    },
    {
      dataField: proteinStrings.tax_id.id,
      text: proteinStrings.tax_id.name,
      sort: true,
      headerStyle: (colum, colIndex) => {
        return { backgroundColor: "#4B85B6", color: "white" };
      }
    }
  ];

export const getGeneLocusList = (
    locusListId,
    offset = 1,
    limit = 20,
    sort = "uniprot_canonical_ac",
    order = "asc"
  ) => {
    const queryParams = {
      id: locusListId,
      offset: offset,
      sort: sort,
      limit: limit,
      order: order
    };
    const queryParamString = JSON.stringify(queryParams);
    const url = `/usecases/genelocus_list?query=${queryParamString}`;
    return getJson(url);
  };

export const getDiseaseToGlycosyltransferases= (formObject) => {
    var json = "query=" + JSON.stringify(formObject);
    const url = "/usecases/disease_to_glycosyltransferases?" + json;
    return getJson(url);
}


export const ORTHOLOG_COLUMNS = [
    {
        dataField: proteinStrings.evidence.id,
        text: proteinStrings.evidence.name,
        sort: true,
        headerStyle: (colum, colIndex) => {
          return { backgroundColor: "#4B85B6", color: "white" };
        },

        formatter: (cell, row) => {
            return (
                <EvidenceList
                    key={row.position + row.uniprot_canonical_ac}
                    evidences={groupEvidences(cell)}
                />
            );
        },
    },
    {
        dataField: proteinStrings.uniprot_canonical_ac.id,
        text: proteinStrings.uniprot_accession.name,
        sort: true,
        selected: true,
        headerStyle: (colum, colIndex) => {
          return { backgroundColor: "#4B85B6", color: "white" };
        },
    
        formatter: (value, row) => (
          <LineTooltip text="View details">
            <Navbar.Text
              as={NavLink}
              to={routeConstants.proteinDetail + row.uniprot_canonical_ac}
            >
              {row.uniprot_canonical_ac}
            </Navbar.Text>
          </LineTooltip>
        )
    },
    {
        dataField: proteinStrings.protein_name.id,
        text: proteinStrings.protein_name.name,
        sort: true,
        headerStyle: (colum, colIndex) => {
          return { backgroundColor: "#4B85B6", color: "white" };
        }
    },
    {
        dataField: proteinStrings.organism.id,
        text: proteinStrings.organism.name,
        sort: true,
        headerStyle: (colum, colIndex) => {
          return { backgroundColor: "#4B85B6", color: "white" };
        }
    },
    {
        dataField: proteinStrings.tax_id.id,
        text: proteinStrings.tax_id.name,
        sort: true,
        headerStyle: (colum, colIndex) => {
          return { backgroundColor: "#4B85B6", color: "white" };
        }
      }
    ];

export const getProteinToOrthologs = (proteinId) => {
    const url = "/usecases/protein_to_orthologs/" + proteinId;
    return getJson(url);
}

export const getSpeciesToGlycosyltransferases = (organism) => {
    const url = "/usecases/species_to_glycosyltransferases/" + organism;
    return getJson(url);
}

export const getSpeciesToGlycohydrolases = (organism) => {
    const url = "/usecases/species_to_glycohydrolases/" + organism;
    return getJson(url);
}

export const getSpeciesToGlycoproteins = (organism, evidenceType) => {
    const url = "/usecases/species_to_glycoproteins/" + organism + "/" + evidenceType;
    return getJson(url);
}

export const getOrthologList = (
    orthologListId,
    offset = 1,
    limit = 20,
    sort = "uniprot_canonical_ac",
    order = "asc"
  ) => {
    const queryParams = {
      id: orthologListId,
      offset: offset,
      sort: sort,
      limit: limit,
      order: order
    };
    const queryParamString = JSON.stringify(queryParams);
    const url = `/usecases/ortholog_list?query=${queryParamString}`;
    return getJson(url);
  };

  export const getBiosynthesisEnzymeToGlycans = (organism, proteinId) => {
    const url = "/usecases/biosynthesis_enzyme_to_glycans/" + organism + "/" + proteinId;
    return getJson(url);
}