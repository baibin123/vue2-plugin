<template>
  <div>
    <base-list
      url="/portal/api/dryingPlan/findDryingPlan"
      :tabs="tabs"
      tabParamsKey="status"
      :fields="fields"
      :columns="columns"
    >
      <template #condition>
        <base-form :form-data="formData" :fields="fields" query>
          <template #goods="{ model }">
            <goods-select
              :productCategories.sync="model.productCategories"
              :productNameCode.sync="model.productNameCode"
            />
          </template>
          <template #query-other-btn>
            <el-button type="primary" @click="visible = true">
              新增计划
            </el-button>
          </template>
        </base-form>
      </template>
      <template #planTime="{ row }">
        <span>{{ row.planStartDate }} - {{ row.planEndDate }}</span>
      </template>
      <template #status="{ row }">
        <span>{{ row.status | status }}</span>
      </template>
      <template #action="{ row }">
        <el-button type="primary" @click="detailClick(row)">详情</el-button>
      </template>
    </base-list>
    <add-plan v-model="visible" :data="selectedData" />
  </div>
</template>

<script>
import AddPlan from "./AddPlan";
export default {
  name: "Home",
  components: { AddPlan },
  data() {
    return {
      fields: {
        planOrderNo: "计划单号",
        createTime: "创建日期",
        sourceName: "计划来源",
        executionCompanyName: "执行单位",
        siteName: "库点",
        productNameName: "商品名称",
        productCategoriesName: "商品类别",
        planMarginQuantity: "总计划量(吨)",
        waterStandard: "水分标准",
        cerealLevelName: "等级",
        headcount: "人员",
        planTime: "计划时限",
        status: "状态",
      },
      formData: [
        { prop: "planOrderNo", kind: "input" },
        {
          prop: "executionCompanyCode",
          url: "/portal/api/common/selectXyCompanyList",
          params: { level: 1 },
          kind: "remote-select",
          multiple: true,
          label: "执行单位",
        },
        {
          prop: "sourceDeptCode",
          url: "/portal/api/business/nature/getBusinessNatureList",
          params: { level: 1, status: 1 },
          kind: "remote-select",
          label: "计划来源",
        },
        {
          prop: "goods",
          keys: ["productCategories", "productNameCode"],
        },
        {
          prop: "expirationDate",
          label: "创建日期",
          kind: "datepicker",
          type: "daterange",
          startKey: "createBeginTime",
          endKey: "createEndTime",
        },
      ],
      columns: [
        "planOrderNo",
        "createTime",
        "sourceName",
        "executionCompanyName",
        "siteName",
        "productNameName",
        "productCategoriesName",
        "planMarginQuantity",
        "waterStandard",
        "cerealLevelName",
        "headcount",
        "planTime",
        "status",
      ],
      tabs: [
        { label: "待执行", name: 1 },
        { label: "执行中", name: 2 },
        { label: "已完成", name: 3 },
        { label: "已取消", name: 4 },
      ],
      visible: false,
      selectedData: {},
    };
  },
  filters: {
    status(val) {
      if (val === 1) return "代执行";
      else return "已执行";
    },
  },
  methods: {
    detailClick(data) {
      this.selectedData = data;
      this.visible = true;
    },
  },
};
</script>
