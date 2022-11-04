<template>
  <div>
    <slot v-if="$scopedSlots.condition" name="condition" />
    <base-form ref="baseForm" v-else query v-bind="$attrs" v-on="$listeners" />
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
import { POST } from "../../http";
export default {
  name: "BaseList",
  props: {
    url: {
      type: String,
      required: true,
    },
  },
  provide() {
    return {
      baseList: this,
    };
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
    onSearch(params) {
      this.page = { pageSize: 10, pageNum: 1 };
      this.searchParams = params;
      this.searchData();
    },
    searchData() {
      POST(this.url, { ...this.searchParams, ...this.page }).then(
        ({ data }) => {
          this.tableData = data.records;
          this.total = data.total;
        }
      );
    },
  },
};
</script>

<style scoped></style>
