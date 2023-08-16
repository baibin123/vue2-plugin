import axios from "../plugins/axios.min";
import config from "./config";
import { getStoreData } from "../util/common";
import qs from "../plugins/qs.min";
import { Message } from "element-ui";

export const PATH_URL = config.baseUrl[process.env.NODE_ENV];

const abortControllerMap = new Map();

const axiosInstance = axios.create({
  ...config,
  baseURL: PATH_URL,
});

axiosInstance.interceptors.request.use((res) => {
  const controller = new AbortController();
  const url = res.url || "";
  res.signal = controller.signal;
  abortControllerMap.set(url, controller);
  return res;
});

axiosInstance.interceptors.response.use(
  (res) => {
    const url = res.config.url || "";
    abortControllerMap.delete(url);
    return res;
  },
  (err) => Promise.reject(err)
);

const defaultRequestInterceptors = (config) => {
  const token = getStoreData("token");
  token && (config.headers["Authorization"] = `Bearer ${token}`);
  if (
    config.method === "post" &&
    config.headers["Content-Type"] === "application/x-www-form-urlencoded"
  ) {
    config.data = qs.stringify(config.data);
  }
  if (config.method === "get" && config.params) {
    let url = config.url;
    url += "?";
    const keys = Object.keys(config.params);
    for (const key of keys) {
      if (config.params[key] !== void 0 && config.params[key] !== null) {
        url += `${key}=${encodeURIComponent(config.params[key])}&`;
      }
    }
    url = url.substring(0, url.length - 1);
    config.params = {};
    config.url = url;
  }
  return config;
};

const defaultResponseInterceptors = (response) => {
  if (response?.config?.responseType === "blob") {
    // 如果是文件流，直接过
    return response;
  } else if (response.data?.success) {
    return response.data;
  } else {
    Message.error(response.data?.fail?.message);
  }
};

const errorHandle = (err) => {
  const { response } = err;
  if (response) {
    // 请求已发出，但是不在2xx的范围
    // 状态码判断
    const status = response.status;
    const msg = response?.data?.msg;
    switch (status) {
      case 401:
        Message.error(msg || `请先登录`);
        break;
      case 403:
        Message.error(`登录过期，请重新登录`);
        break;
      case 404:
        Message.error(`请求的资源不存在`);
        break;
      case 500:
        Message.error(`服务器内部错误`);
        break;
      default:
        Message.error(`网络异常`);
    }
    return Promise.reject(response);
  } else {
    // 处理断网的情况
    // eg:请求超时或断网时，更新state的network状态
    Message.error(`网络异常`);
    return Promise.reject(err);
  }
};

axiosInstance.interceptors.request.use(defaultRequestInterceptors);
axiosInstance.interceptors.response.use(
  defaultResponseInterceptors,
  errorHandle
);

const service = {
  request: (config) => {
    return new Promise((resolve, reject) => {
      if (config.interceptors?.requestInterceptors) {
        config = config.interceptors.requestInterceptors(config);
      }
      axiosInstance
        .request(config)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  cancelRequest: (url) => {
    const urlList = Array.isArray(url) ? url : [url];
    for (const _url of urlList) {
      abortControllerMap.get(_url)?.abort();
      abortControllerMap.delete(_url);
    }
  },
  cancelAllRequest() {
    // eslint-disable-next-line no-unused-vars
    for (const [_, controller] of abortControllerMap) {
      controller.abort();
    }
    abortControllerMap.clear();
  },
};

export default service;
