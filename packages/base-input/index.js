import BaseInput from "./src/input";

/* istanbul ignore next */
BaseInput.install = function (Vue) {
  Vue.component(BaseInput.name, BaseInput);
};

export default BaseInput;
