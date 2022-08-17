export const setToken = (token: string) => {
  if (typeof window !== "undefined") return window.localStorage.setItem("accessToken", token);
  return undefined;
};

export const getToken = () => {
  if (typeof window !== "undefined") return window.localStorage.getItem("accessToken");
  return undefined;
};

export const removeToken = () => {
  if (typeof window !== "undefined") return window.localStorage.clear();
  return undefined;
};
