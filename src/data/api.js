import axios from "axios";

export const ROOT_API_URL = "https://api.glygen.org";
export const ROOT_TST_API_URL = "https://api.tst.glygen.org/";

export const getJson = (url, headers = {}) => {
  return axios.get(ROOT_API_URL + url, {
    headers
  });
};

export const getTstJson = (url, headers = {}) => {
  return axios.get(ROOT_TST_API_URL + url, {
    headers
  });
};

export const postTo = (url, headers = {}) => {
  const options = {
    method: "POST",
    headers: headers,
    url: ROOT_API_URL + url
  };

  return axios(options);
};

export const postToAndGetBlob = (url, headers = {}) => {
  const options = {
    method: "POST",
    headers: headers,
    url: ROOT_API_URL + url,
    responseType: "blob"
  };

  return axios(options);
};
