import BaseExecute from "./src/execute";

/* istanbul ignore next */
BaseExecute.install = function (Vue) {
  Vue.component(BaseExecute.name, BaseExecute);
};

export default BaseExecute;
