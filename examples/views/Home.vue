<template>
  <div>
    <base-list
      url="/portal/api/dryingPlan/findDryingPlan"
      :fields="fields"
      :columns="columns"
      :params="prod"
    >
      <template #condition>
        <base-form :form-data="formData" :model="prod" :fields="fields" query>
          <template #goods="{ model }">
            <goods-select v-model="prod" @input="goodsChange(model)" />
          </template>
        </base-form>
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
      prod: { productCategories: "1000101", productNameCode: "100010101" },
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
        { prop: "goods" },
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
  methods: {
    goodSelected(params, form) {
      console.log("params:", params, "form: ", form);
    },
    goodsChange(model) {
      model.productCategories = this.prod.productCategories;
      model.productNameCode = this.prod.productNameCode;
    },
  },
  filters: {
    status(val) {
      if (val === 1) return "代执行";
      else return "已执行";
    },
  },
};
</script>
