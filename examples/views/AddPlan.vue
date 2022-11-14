<template>
  <base-form
    :form-config="formConfig"
    :model="formModel"
    :form-span="12"
    :btn-span="24"
    style="padding: 0 20px"
    @on-change="changeForm"
  >
    <template #goods="{ model }">
      <goods-select
        disabled
        :span="12"
        :productCategories.sync="model.productCategories"
        :productNameCode.sync="model.productNameCode"
      />
    </template>
    <template #customer-btns>
      <el-button @click="close">取消</el-button>
      <el-button type="primary">保存</el-button>
    </template>
  </base-form>
</template>

<script>
export default {
  name: "AddPlan",
  props: {
    data: Object,
    visible: Boolean,
  },
  data() {
    return {
      formConfig: [
        { prop: "planOrderNo", label: "计划单号", kind: "input" },
        {
          prop: "createTime",
          label: "创建日期",
          kind: "input",
          disabled: true,
        },
        { prop: "creator", label: "创建人", kind: "input", disabled: true },
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
          url: "/portal/api/common/selectXyCompanyList",
          params: { level: 2 },
          kind: "remote-select",
          label: "库点",
        },
        {
          prop: "materialId",
          url: "/portal/api/Material/allMaterialInfo",
          kind: "remote-select",
          labelKey: "materialDesc",
          label: "关联物料主数据",
        },
        {
          prop: "goodsAttribute",
          label: "货品属性",
          url: "/portal/api/Material/allMaterialPropInfo",
          kind: "remote-select",
          labelKey: "propName",
          disabled: true,
        },
        {
          prop: "goods",
          keys: ["productCategories", "productNameCode"],
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
        {
          prop: "remark",
          label: "备注",
          kind: "input",
        },
      ],
      formModel: {},
    };
  },
  created() {
    if (this.data?.planOrderNo) {
      this.formModel = this.data;
      if (this.data?.executionCompanyCode) {
        this.getFormItem("siteCode").params = {
          level: 2,
          ids: [this.data?.executionCompanyCode],
        };
        this.getFormItem("materialId").params = {
          companyIds: [this.data?.executionCompanyCode],
        };
      }
    } else {
      this.formConfig = this.formConfig.filter(
        (item) => item.prop !== "createTime" && item.prop !== "creator"
      );
      this.getFormItem("siteCode").immediate = false;
      this.getFormItem("materialId").immediate = false;
    }
  },
  methods: {
    getFormItem(prop) {
      return this.formConfig.find((item) => item.prop === prop);
    },
    changeForm(key, data) {
      if (key === "executionCompanyCode" && data) {
        this.getFormItem("siteCode").params = { level: 2, ids: [data.id] };
        this.getFormItem("materialId").params = { companyIds: [data.id] };
      } else if (key === "materialId") {
        this.formModel.goodsAttribute = data.propId;
        this.formModel.productNameCode = data.nameId;
        this.formModel.productCategories = data.typeId;
        this.$forceUpdate()
      }
    },
    close() {
      this.$emit("update:visible", false);
    },
  },
};
</script>

<style scoped></style>
