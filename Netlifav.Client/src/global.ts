import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

export enum CONSTANTS {
  ApiBaseURL = "http://localhost:3000",
}

export const axiosInstance = axios.create({
  baseURL: CONSTANTS.ApiBaseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export function getToken() {
  const token = JSON.parse(localStorage.getItem("auth")!);
  return token as { accessToken: string; refreshToken: string };
}

let _authorizing: Promise<void | AxiosResponse<unknown, unknown>> | null = null;

axiosInstance.interceptors.request.use((config) => {
  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token.accessToken}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(undefined, (error: AxiosError) => {
  if (error.response?.status !== 401) {
    throw error;
  }

  const token = getToken();

  _authorizing ??= axios
    .post(`${CONSTANTS.ApiBaseURL}/auth/refresh-token`, {
      refresh_token: token?.refreshToken,
    })
    .then(({ data }) => {
      localStorage.setItem("auth", JSON.stringify(data));
    })
    .finally(() => (_authorizing = null))
    .catch((error) => {
      localStorage.clear();
      window.location.assign("/auth/login");
      return Promise.reject(error);
    });

  const originalRequestConfig =
    error.config as InternalAxiosRequestConfig<unknown>;
  delete originalRequestConfig.headers.Authorization;

  return _authorizing?.then(() => axiosInstance.request(originalRequestConfig));
});

export { axiosInstance as axios };
