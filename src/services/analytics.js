import http from "./http";
const getData = (path) => {
  return http.get(`http://localhost/${path}`);
};

const getRooms = (filter = {}) => {
  return http.get(`/stats/filters/`);
};

export { getData, getRooms };
