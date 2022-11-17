import BaseForm from "./src/form";
import BaseFormItem from "./src/form-item";

/* istanbul ignore next */
BaseForm.install = function (Vue) {
  Vue.component(BaseForm.name, BaseForm);
  Vue.component(BaseForm.name, BaseFormItem);
};

export default BaseForm;
