import axios from "axios";
import { getToken } from "../utils/token";

const BASE_URL = "https://5co7shqbsf.execute-api.ap-northeast-2.amazonaws.com/production/";

let token;
if (getToken()) {
  token = getToken().replace(/\"/gi, "");
}

export const tokenAxios = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const Axios = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-type": "application/json",
  },
});
