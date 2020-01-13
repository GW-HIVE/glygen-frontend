import axios from 'axios'

import { ROOT_API_URL } from './api';

export const getSystemData = () => {
    const url = `${ROOT_API_URL}/pages/home_init`;

    return axios.get(url);
}