import Cookies from "js-cookie";

const ACCESS_TOKEN_KEY = "vivoo_access_token";
const REFRESH_TOKEN_KEY = "vivoo_refresh_token";

export const setTokens = (accessToken: string, refreshToken: string) => {
  Cookies.set(ACCESS_TOKEN_KEY, accessToken, { expires: 1 }); // 1 day
  Cookies.set(REFRESH_TOKEN_KEY, refreshToken, { expires: 7 }); // 7 days
};

export const getAccessToken = () => {
  return Cookies.get(ACCESS_TOKEN_KEY);
};

export const getRefreshToken = () => {
  return Cookies.get(REFRESH_TOKEN_KEY);
};

export const clearTokens = () => {
  Cookies.remove(ACCESS_TOKEN_KEY);
  Cookies.remove(REFRESH_TOKEN_KEY);
};
