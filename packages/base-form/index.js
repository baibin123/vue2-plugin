import BaseForm from "./src/form";

/* istanbul ignore next */
BaseForm.install = function (Vue) {
  Vue.component(BaseForm.name, BaseForm);
};

export default BaseForm;
