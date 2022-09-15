import BaseTable from "./base-table";
import BasePagination from "./base-pagination";
import BaseForm from "./base-form";
import BaseList from "./base-list";
import BaseSelect from "./base-select";
import BaseInput from "./base-input";
const components = [
  BaseTable,
  BasePagination,
  BaseForm,
  BaseList,
  BaseSelect,
  BaseInput,
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
};
