import axios from "axios";

export default axios.create({
  baseURL: "https://dev.meets.openhouse.study/",
  timeout: 1000,
});
