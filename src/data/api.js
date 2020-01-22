import axios from 'axios'

export const ROOT_API_URL = 'https://api.glygen.org'

export const getJson = (url) => {
    return axios.get( ROOT_API_URL + url);
}