import { getJson } from "./api";

export const getPublicationDetail = (publId, publType) => {
  const queryParamString = JSON.stringify({
    id: publId,
    type: publType,
  });
  const url = `/publication/detail?query=${queryParamString}`;
  return getJson(url);
};
