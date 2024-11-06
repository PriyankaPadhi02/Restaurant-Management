/* eslint-disable no-undef */
import axios from "axios";
import Cookies from "js-cookie";
import { getBaseURL, showToastError } from "../../utils/common";

axios.defaults.headers = {
  "ngrok-skip-browser-warning": "testing",
};

const client = axios.create({
  baseURL: getBaseURL(),
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

const get = (url, body, headers = {}) =>
  client.get(url, {
    params: body,
    headers: headers,
    // for removing empty array params from query string, refrence https://github.com/axios/axios/issues/5058#issuecomment-1272107602
    paramsSerializer: {
      indexes: null,
    },
  });

const post = (url, body, headers = {}) => client.post(url, body, { headers });

const put = (url, body, headers = {}) => client.put(url, body, headers);

const patch = (url, body, headers = {}) => client.patch(url, body, { headers });

const del = (url, body, headers = {}) => client.delete(url, body, { headers });

const pendingRequests = new Map();

client.interceptors.request.use(
  async (config) => {
    const requestIdentifier = `${config.url}_${config.method}`;

    const token = Cookies.get("token");
    // const Ugid = Cookies.get("UgId") || null;
    config.headers.Authorization = token ? `Bearer ${token}` : null;
    // config.headers["UgId"] = Ugid;

    // if (pendingRequests.has(requestIdentifier)) {
    //   const cancelTokenSource = pendingRequests.get(requestIdentifier);
    //   // cancel the previous request
    //   // cancelTokenSource.cancel('Cancelled due to new request')
    // }

    const newCancelTokenSource = axios.CancelToken.source();
    config.cancelToken = newCancelTokenSource.token;
    pendingRequests.set(requestIdentifier, newCancelTokenSource);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

client.interceptors.response.use(
  (response) => {
    if (!response.data.isSuccess && response?.data?.errorMessages?.length) {
      // showToastSuccess(response?.data?.displayMessage)
      showToastError(response?.data?.displayMessage);

      return Promise.reject(error);
    }
    const requestIdentifier = `${response.config.url}_${response.config.method}`;
    pendingRequests.delete(requestIdentifier);
    return response;
  },
  (error) => {
    if (error?.response?.status === 401) {
      Cookies.remove("token");
      // Cookies.remove("Ugid");
    }
    // return error
    return Promise.reject(error);
  }
);

export { get, post, put, del, patch };

export default client;
