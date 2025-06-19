// config
import { HOST_API } from 'config';
// routes
import { PATH_PAGE } from 'routes/paths';
import axios, { InternalAxiosRequestConfig } from 'axios';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  baseURL: HOST_API,
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (config.url && config.url.charAt(0) === '/') {
      config.url = `${HOST_API}${config.url}`;
    }
   
    // const { accessToken } = JSON.parse(
    //   localStorage.getItem(import.meta.env.REACT_APP_LOCAL_TOKEN!) || '{}'
    // );
    // if (config.headers === undefined) {
    //   config.headers = {};
    // }
    // config.headers.Authorization = `Bearer ${accessToken}`;

    // TODO: Apply logger or any prior action
    return config;
  },
  (error) => Promise.reject(error)
  // TODO: apply error logger
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.status || error?.response?.status;
    if (status === 401 || status === 504) {
      window.location.href = PATH_PAGE.login;
    }

    if (status === 403 && window.location.pathname === PATH_PAGE.login) {
      return Promise.resolve(error.response);
    }
    if (error.code === 'ENCONNABORTED') {
      // if timeout, redirect to timeout
      // forwardTo('/timeout')
      const event = new Event('requestTimeout');
      document.dispatchEvent(event);
      const timeoutError = {
        timeout: true,
      };
      return Promise.reject(timeoutError);
    }
    return Promise.reject(error?.response);
  }
);

// GET REQUEST
export const sendGet = (api: string, options?: any, dataOnly = true) =>
  new Promise((resolve, reject) => {
    axiosInstance
      .get(api, options)
      .then((response) => {
        if (dataOnly) resolve(response?.data);
        else resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });

// POST REQUEST
export const sendPost = (api: string, payload: any, options?: any, dataOnly: boolean = true) =>
  new Promise((resolve, reject) => {
    axiosInstance
      .post(api, payload, options)
      .then((response) => {
        if (dataOnly) resolve(response?.data);
        else resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });

// PUT REQUEST
export const sendPut = (api: string, payload: any, options?: any, dataOnly: boolean = true) =>
  new Promise((resolve, reject) => {
    axiosInstance
      .put(api, payload, options)
      .then((response) => {
        if (dataOnly) resolve(response?.data);
        else resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });

// PATCH REQUEST
export const sendPatch = (api: string, payload: any, options?: any, dataOnly: boolean = true) =>
  new Promise((resolve, reject) => {
    axiosInstance
      .patch(api, payload, options)
      .then((response) => {
        if (dataOnly) resolve(response?.data);
        else resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });

// DELETE REQUEST
export const sendDelete = (api: string, options?: any, dataOnly: boolean = true) =>
  new Promise((resolve, reject) => {
    axiosInstance
      .delete(api, options)
      .then((response) => {
        if (dataOnly) resolve(response?.data);
        else resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });

export default axiosInstance;
