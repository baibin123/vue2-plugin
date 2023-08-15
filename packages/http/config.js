import qs from "../plugins/qs.min";
import { getStoreData } from "../util/common";
import { Message } from "element-ui";

const config = {
  /**
   * api请求基础路径
   */
  baseUrl: {
    // 开发环境接口前缀
    base: "https://t-waasapi.xydti.com",

    // 打包开发环境接口前缀
    development: "https://t-waasapi.xydti.com",

    // 打包生产环境接口前缀
    pro: "https://t-waasapi.xydti.com",

    // 打包测试环境接口前缀
    test: "https://t-waasapi.xydti.com",
  },

  /**
   * 接口成功返回状态码
   */
  code: 0,

  /**
   * 接口请求超时时间
   */
  timeout: 60000,

  /**
   * 默认接口请求类型
   * 可选值：application/x-www-form-urlencoded multipart/form-data
   */
  defaultHeaders: "application/json",

  interceptors: {
    //请求拦截
    // requestInterceptors: (config) => {
    //   return config
    // },
    // 响应拦截器
    // responseInterceptors: (result: AxiosResponse) => {
    //   return result
    // }
  },
};

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
  } else if (response.success) {
    return response;
  } else {
    Message.error(response?.fail?.message);
  }
};

export { defaultResponseInterceptors, defaultRequestInterceptors };
export default config;
