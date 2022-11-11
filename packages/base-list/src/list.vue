<template>
  <div>
    <slot ref="slotRef" v-if="$scopedSlots.condition" name="condition" />
    <base-form ref="baseForm" v-else query v-bind="$attrs" v-on="$listeners" />
    <el-tabs
      v-if="tabs.length > 0"
      v-model="tabActive"
      type="border-card"
      @tab-click="tabClick"
    >
      <el-tab-pane
        v-for="t of tabs"
        :key="t.name"
        :label="t.label"
        :name="`${t.name}`"
      >
        <base-table
          :table-data="tableData"
          v-loading="tableLoading"
          v-bind="$attrs"
          v-on="$listeners"
        >
          <template #[slotName]="scope" v-for="(_, slotName) in tableSlots">
            <slot :name="slotName" v-bind="scope" />
          </template>
        </base-table>
      </el-tab-pane>
    </el-tabs>
    <base-table
      v-else
      :table-data="tableData"
      v-loading="tableLoading"
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
    tabs: {
      type: Array,
      default: () => [],
    },
    tabParamsKey: String,
    params: {
      type: Object,
      default: () => ({}),
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
      tabActive: this.tabs.length > 0 ? `${this.tabs[0].name}` : null,
      tableLoading: false,
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
    tabClick() {
      this.page = { pageSize: 10, pageNum: 1 };
      this.searchData();
    },
    onSearch(params) {
      this.page = { pageSize: 10, pageNum: 1 };
      this.searchParams = params;
      this.searchData();
    },
    searchData() {
      let params = {
        ...this.params,
        ...this.searchParams,
        ...this.page,
      };
      if (this.tabParamsKey) params[this.tabParamsKey] = this.tabActive;
      this.tableLoading = true;
      POST(this.url, params)
        .then(({ data }) => {
          this.tableData = data.records;
          this.total = data.total;
        })
        .finally(() => {
          this.tableLoading = false;
        });
    },
  },
};
</script>

<style scoped></style>
