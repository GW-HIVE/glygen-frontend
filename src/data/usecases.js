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
