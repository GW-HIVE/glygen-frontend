import { getJson} from "./api";

export const getTypeahed = (typeahedID, inputValue, limit=100) => {
    const url = `/typeahead?query={"field":"${typeahedID}","value":"${inputValue}","limit":${limit}}`;
    return getJson(url);
}