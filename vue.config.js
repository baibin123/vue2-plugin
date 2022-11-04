const path = require("path");
module.exports = {
  pages: {
    index: {
      // page 的入口
      entry: "examples/main.js",
      // 模板来源
      template: "public/index.html",
      // 在 dist/index.html 的输出
      filename: "index.html",
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: "公共组件",
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ["chunk-vendors", "chunk-common", "index"],
    },
  },
  css: {
    extract: false, // 是否使用css分离插件 ExtractTextPlugin
  },
  configureWebpack: {
    resolve: {
      alias: {
        "@": path.join(__dirname, "examples"),
      },
    },
    devServer: {
      proxy: {
        "/*": {
          target: "https://t-waasapi.xydti.com",
          changeOrigin: true,
          ws: false,
        },
      },
    },
  },
};
