import RemoteSelect from "./src/select";

/* istanbul ignore next */
RemoteSelect.install = function (Vue) {
  Vue.component(RemoteSelect.name, RemoteSelect);
};

export default RemoteSelect;
