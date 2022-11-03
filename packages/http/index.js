import axios from "axios";
import common from "../util/common";
import { Message } from "element-ui";
import qs from "qs";

const baseUrl = {
  development: "",
  production: "https://dev.waasapi.xydti.com",
};
switch (location.host) {
  case "dev.waas.xydti.com":
    baseUrl.production = "https://dev.waasapi.xydti.com";
    break;
  case "t-waas.xydti.com":
    baseUrl.production = "https://t-waasapi.xydti.com";
    break;
  case "u-waas.xydti.com":
    baseUrl.production = "https://u-waasapi.xydti.com";
    break;
  case "waas.xydti.com":
    baseUrl.production = "https://waasapi.xydti.com";
    break;
}
const instance = axios.create({ timeout: 1000 * 30 });
//拦截request
instance.interceptors.request.use(
  (config) => {
    const token = common.getStoreData("token");
    token && (config.headers["Authorization"] = `Bearer ${token}`);
    if (config.method === "get") {
      config.paramsSerializer = function (params) {
        return qs.stringify(params, { arrayFormat: "repeat" });
      };
    }
    return config;
  },
  (error) => Promise.error(error)
);

//拦截response
instance.interceptors.response.use(
  // 请求成功
  (res) => {
    const { showError = true } = res.config;
    if (res.status !== 200) {
      Message.error(res.data.message);
    } else if (!res.data.success) {
      if (res.data?.fail?.code === "401" || res?.data?.fail?.code === "402")
        gotoLogin();
      //过滤文件导入1000009错误码的信息提示
      if (
        res.data?.fail?.message &&
        res.data?.fail?.code !== "1000009" &&
        showError
      ) {
        Message.error(res.data?.fail?.message);
      }
      // 接口业务异常，show error message
      return Promise.reject(res);
    }
    return res.data;
  },
  // 请求失败
  (error) => {
    const { response } = error;
    if (response) {
      // 请求已发出，但是不在2xx的范围
      errorHandle(response.status, response?.data?.msg);
      return Promise.reject(response);
    } else {
      return Promise.reject(error);
      // 处理断网的情况
      // eg:请求超时或断网时，更新state的network状态
      // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
      // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
      // store.commit('changeNetwork', false);
    }
  }
);

const gotoLogin = function () {
  const redirect = encodeURIComponent(location.hash);
  if (!location.hash.startsWith("#/login")) {
    if (process.env.NODE_ENV === "development") {
      location.href = "#/login?redirect=" + redirect;
    } else {
      location.href = "/index.html#/login?redirect=" + redirect;
    }
  }
};

const errorHandle = (status, msg) => {
  // 状态码判断
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
    case 700:
      Message.error(msg || "未知错误,请刷新重试");
      break;
    default:
      Message.error(`网络异常`);
  }
};

export default {
  POST(url, data, config) {
    return instance.post(
      `${baseUrl[process.env.NODE_ENV]}${url}`,
      data,
      config
    );
  },
  GET(url, params) {
    return instance.get(`${baseUrl[process.env.NODE_ENV]}${url}`, params);
  },
};
