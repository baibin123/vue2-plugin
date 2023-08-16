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
};

export default config;
