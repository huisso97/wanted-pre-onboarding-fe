import { Axios } from "../api";

export const signIn = async (data) => {
  return await Axios.post("/auth/signin", data);
};
export const signUp = async (data) => {
  return await Axios.post("/auth/signup", data);
};
