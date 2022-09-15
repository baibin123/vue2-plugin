import BaseList from "./src/list";

/* istanbul ignore next */
BaseList.install = function (Vue) {
  Vue.component(BaseList.name, BaseList);
};

export default BaseList;
