import BasePagination from "./src/pagination";

/* istanbul ignore next */
BasePagination.install = function (Vue) {
  Vue.component(BasePagination.name, BasePagination);
};

export default BasePagination;
