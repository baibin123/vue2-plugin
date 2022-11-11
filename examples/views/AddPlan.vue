<template>
  <el-drawer title="新建计划" :visible="value" @close="close" size="80%">
    <base-form
      :form-data="formData"
      :model="formModel"
      :form-span="12"
      :btn-span="24"
      style="padding: 0 20px"
    >
      <template #customer-btns>
        <el-button @close="close">取消</el-button>
        <el-button type="primary">保存</el-button>
      </template>
    </base-form>
  </el-drawer>
</template>

<script>
export default {
  name: "AddPlan",
  props: {
    value: Boolean,
    data: Object,
  },
  data() {
    return {
      formData: [
        { prop: "planOrderNo", label: "计划单号", kind: "input" },
        { prop: "createTime", label: "创建日期", kind: "input" },
        { prop: "creator", label: "创建人", kind: "input" },
        {
          prop: "executionCompanyCode",
          url: "/portal/api/common/selectXyCompanyList",
          params: { level: 1 },
          kind: "remote-select",
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
          prop: "siteCode",
          url: "/portal/api/business/nature/getBusinessNatureList",
          immediate: false,
          kind: "remote-select",
          label: "库点",
        },
        {
          prop: "materialId",
          url: "/portal/api/Material/allMaterialInfo",
          immediate: false,
          kind: "remote-select",
          label: "关联物料主数据",
        },
        {
          prop: "productAttrLabel",
          label: "货品属性",
          kind: "input",
          disabled: true,
        },
        {
          prop: "productCategoriesLabel",
          label: "货品类别",
          kind: "input",
          disabled: true,
        },
        {
          prop: "productNameLabel",
          label: "货品名称",
          kind: "input",
          disabled: true,
        },
        {
          prop: "planTotalQuantity",
          label: "任务总量",
          kind: "input",
        },
        {
          prop: "waterStandard",
          label: "水分标准",
          kind: "input",
        },
        {
          prop: "cerealLevel",
          label: "等级",
          url: "/portal/api/grain/grade/findAllGrainGradeList",
          kind: "remote-select",
          labelKey: "grainGrade",
        },
        {
          prop: "headcount",
          label: "人员",
          kind: "input",
        },
        {
          prop: "planDate",
          label: "计划日期日期",
          kind: "datepicker",
          type: "daterange",
          startKey: "createBeginTime",
          endKey: "createEndTime",
        },
      ],
      formModel: this.data,
    };
  },
  methods: {
    close() {
      this.$emit("input", false);
    },
  },
};
</script>

<style scoped></style>
