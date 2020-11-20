import axios from "axios";

const createConnector = () => {
  const config = {};
  const accessToken = localStorage.getItem("credential")
    ? JSON.parse(localStorage.getItem("credential")).accessToken
    : null;
  if (accessToken) {
    config.headers = {
      Authorization: "Bearer " + accessToken,
    };
  }
  return axios.create(config);
};

export default createConnector();
