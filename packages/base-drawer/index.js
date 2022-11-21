import BaseDrawer from "./src/drawer";

/* istanbul ignore next */
BaseDrawer.install = function (Vue) {
  Vue.component(BaseDrawer.name, BaseDrawer);
};

export default BaseDrawer;
