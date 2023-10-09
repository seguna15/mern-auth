import axios from "axios";
import { BackendURL } from "../Server";

axios.defaults.baseURL = BackendURL;
let refresh = false;

axios.interceptors.response.use

axios.interceptors.response.use(resp => resp, async error => {
  const prevRequest = error?.config;
  if (error.response.status === 401 && !refresh) {
    refresh = true;
    const response = await axios.post(
      "/auth/refresh",
      {},
      { withCredentials: true }
    );
    if (response.status === 200) {
      prevRequest.headers[
        "Authorization"
      ] = `Bearer ${response.data["accessToken"]}`;
      return axios(prevRequest);
    }
  }
  
  refresh = false;
  return Promise.reject(error);
})
 