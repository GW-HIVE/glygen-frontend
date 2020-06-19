import { getJson } from "./api";



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

export const getDiseaseToGlycosyltransferases= (formObject) => {
    var json = "query=" + JSON.stringify(formObject);
    const url = "/usecases/disease_to_glycosyltransferases?" + json;
    return getJson(url);
}

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