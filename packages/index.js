//数组原型
import "./util/array.prototype";
//公用组件
import BaseTable from "./base-table";
import BasePagination from "./base-pagination";
import BaseForm from "./base-form";
import BaseList from "./base-list";
import BaseSelect from "./base-select";
import BaseInput from "./base-input";
import RemoteSelect from "./remote-select";
//业务组件
import GoodSelect from "./business-components/goods-select/src/GoodsSelect";
import DictSelect from "./business-components/dict-select/src/DictSelect";
const components = [
  BaseTable,
  BasePagination,
  BaseForm,
  BaseList,
  BaseSelect,
  BaseInput,
  RemoteSelect,
  GoodSelect,
  DictSelect,
];

const install = function (Vue) {
  components.forEach((component) => {
    Vue.component(component.name, component);
  });
};

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export default {
  install,
  BaseTable,
  BasePagination,
  BaseForm,
  BaseList,
  BaseSelect,
  BaseInput,
  RemoteSelect,
  GoodSelect,
  DictSelect,
};
