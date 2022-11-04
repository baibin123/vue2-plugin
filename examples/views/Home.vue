<template>
  <div>
    <base-list
      url="/portal/api/dryingPlan/findDryingPlan"
      :fields="fields"
      :columns="columns"
    >
      <template #condition>
        <base-form :form-data="formData" :fields="fields" query />
      </template>
      <template #planTime="{ row }">
        <span>{{ row.planStartDate }} - {{ row.planEndDate }}</span>
      </template>
      <template #status="{ row }">
        <span>{{ row.status | status }}</span>
      </template>
    </base-list>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
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
        { prop: "createTime", kind: "datepicker", type: "date" },
        {
          prop: "sourceName",
          kind: "select",
          options: [
            { label: "男", value: 1 },
            { label: "女", value: 2 },
          ],
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
    };
  },
  filters: {
    status(val) {
      if (val === 1) return "代执行";
      else return "已执行";
    },
  },
};
</script>
