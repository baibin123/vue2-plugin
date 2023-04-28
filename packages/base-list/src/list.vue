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
        lazy
      >
        <base-table
          :table-data="tableData"
          v-loading="tableLoading"
          :url="url"
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
      :url="url"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <template #[slotName]="scope" v-for="(_, slotName) in tableSlots">
        <slot :name="slotName" v-bind="scope" />
      </template>
    </base-table>
    <base-pagination
      v-if="showPaging"
      :page="page"
      :total="total"
      @change="_searchData"
    />
  </div>
</template>

<script>
import http from "../../http";
export default {
  name: "BaseList",
  props: {
    url: {
      type: String,
      required: true,
    },
    pageSize: {
      type: Number,
      default: 10,
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
    showPaging: {
      type: Boolean,
      default: true,
    },
    primaryKey: {
      type: String,
      default: "records",
    },
    immediate: {
      type: Boolean,
      default: true,
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
        pageSize: this.pageSize,
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
    this.immediate && this._searchData();
  },
  methods: {
    tabClick() {
      this.page = { pageSize: this.pageSize, pageNum: 1 };
      this._searchData();
    },
    onSearch(params) {
      this.page = { pageSize: this.pageSize, pageNum: 1 };
      this.searchParams = params;
      this._searchData();
    },
    reload() {
      this._searchData();
    },
    _searchData() {
      let params = {
        ...this.params,
        ...this.searchParams,
        ...this.page,
      };
      if (!this.showPaging) {
        delete params.pageSize;
        delete params.pageNum;
      }
      if (this.tabParamsKey) params[this.tabParamsKey] = this.tabActive;
      this.tableLoading = true;
      http
        .POST(this.url, params)
        .then(({ data }) => {
          this.tableData = data[this.primaryKey];
          this.total = data?.total;
          this.$emit("on-finish", this.tableData);
        })
        .finally(() => {
          this.tableLoading = false;
        });
    },
  },
};
</script>

<style scoped></style>
