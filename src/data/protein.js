import { getJson } from './api';

export const getProtienList = (protienListId) => {
    const url = `/protein/list?query={"id":"${protienListId}","offset":1,"limit":100,"sort":"uniprot_canonical_ac","order":"asc"}`;

    return getJson(url);
}

export const getProtienDetail = (accessionId) => {
    const url = `/protein/detail/${accessionId}`;

    return getJson(url);
}
