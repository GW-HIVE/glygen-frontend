import axios from 'axios'

import { ROOT_API_URL } from './api';

export const getProtienList = (protienListId) => {
    const url = `${ROOT_API_URL}/protein/list?query={"id":"${protienListId}","offset":1,"limit":100,"sort":"uniprot_canonical_ac","order":"asc"}`;

    return axios.get(url);
}

export const getProtienDetail = (accessionId) => {
    const url = `${ROOT_API_URL}/protein/detail/${accessionId}`;

    return axios.get(url);
}