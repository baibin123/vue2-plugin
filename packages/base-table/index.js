import BaseTable from "./src/table";

/* istanbul ignore next */
BaseTable.install = function (Vue) {
  Vue.component(BaseTable.name, BaseTable);
};

export default BaseTable;
