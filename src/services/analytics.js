import http from "./http";
const getData = (path) => {
  return http.get(`/${path}`);
};

export { getData };
