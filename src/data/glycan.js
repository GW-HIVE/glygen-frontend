import { getJson } from './api';

export const getGlycanList = (glycanListId) => {
    const url = `/glycan/list?query={"id":"${glycanListId}","offset":1,"limit":20,"order":"asc"}`;

    return getJson(url);
}