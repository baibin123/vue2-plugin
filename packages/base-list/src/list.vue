<template>
  <div>
    <slot v-if="$scopedSlots.condition" />
    <base-form
      ref="baseForm"
      v-else
      query
      v-bind="getFormConfig().attrs"
      v-on="getFormConfig().listeners"
      @on-search="onSearch"
    />
    <base-table
      :table-data="tableData"
      :highlight-current-row="true"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <template #[slotName]="scope" v-for="(_, slotName) in tableSlots">
        <slot :name="slotName" v-bind="scope" />
      </template>
    </base-table>
    <base-pagination :page="page" :total="total" @change="searchData" />
  </div>
</template>

<script>
import request from "../../http";
export default {
  name: "BaseList",
  props: {
    url: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      page: {
        pageSize: 10,
        pageNum: 1,
      },
      total: 0,
      tableData: [],
      searchParams: {},
    };
  },
  computed: {
    tableSlots() {
      //eslint-disable-next-line
      const { condition, ...tableSlots } = this.$scopedSlots;
      return tableSlots;
    },
  },
  created() {
    this.searchData();
  },
  methods: {
    getFormConfig() {
      const attrs = [
        "form-data",
        "model",
        "rules",
        "form-span",
        "size",
        "fields",
      ];
      const listeners = [];
      return {
        attrs: this.transferAttr(attrs),
        listeners: this.transferListeners(listeners),
      };
    },
    getTableConfig() {
      const attrs = ["columns", "size", "fields", "highlight-current-row"];
      const listeners = [];
      return {
        attrs: this.transferAttr(attrs),
        listeners: this.transferListeners(listeners),
      };
    },
    transferAttr(attrs) {
      return attrs.reduce(
        (obj, key) => ({ ...obj, [key]: this.$attrs?.[key] }),
        {}
      );
    },
    transferListeners(attrs) {
      return attrs.reduce(
        (obj, key) => ({ ...obj, [key]: this.$listeners?.[key] }),
        {}
      );
    },
    onSearch(params) {
      this.page = { pageSize: 10, pageNum: 1 };
      this.searchParams = params;
      this.searchData();
    },
    searchData() {
      request
        .POST(this.url, { ...this.searchParams, ...this.page })
        .then(({ data }) => {
          this.tableData = data.records;
          this.total = data.total;
        });
    },
  },
};
</script>

<style scoped></style>
