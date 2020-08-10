import { getJson, getUrl} from "./api";
import { logActivity } from "../data/logging";

export const getTypeahed = (typeahedID, inputValue, limit=100) => {
    const url = `/typeahead?query={"field":"${typeahedID}","value":"${inputValue}","limit":${limit}}`;
    return getJson(url);
}

export const getCategorizedTypeahed = (typeahedID, inputValue, totalLimit=15, categorywiseLimit=5) => {
    const url = `/categorized_typeahead?query={"field":"${typeahedID}","value":"${inputValue}","total_limit":${totalLimit},"categorywise_limit":${categorywiseLimit}}`;
    return getJson(url);
}

export const getGlobalSearch = (searchTerm) => {
    const url = `/globalsearch/search?query={"term":"${searchTerm}"}`;
    return getJson(url);
}

export const getDownload = (id, format, compressed, type, headers) => {
    let message = "displayed successfully ";
    logActivity("user", id, format, compressed, "No results. " + message);
    const query = { id, type, format, compressed };
    const url = `/data/download?query=${JSON.stringify(query)}`;
    return getJson(url, headers);
  };

  export const getDownloadUrl = (id, format, compressed, type) => {
    let message = "displayed successfully ";
    logActivity("user", id, format, compressed, "No results. " + message);
    const query = { id, type, format, compressed };
    const url = `/data/download?query=${JSON.stringify(query)}`;
    return getUrl(url);
  };