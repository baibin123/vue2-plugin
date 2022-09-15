import BaseSelect from "./src/select";

/* istanbul ignore next */
BaseSelect.install = function (Vue) {
  Vue.component(BaseSelect.name, BaseSelect);
};

export default BaseSelect;
