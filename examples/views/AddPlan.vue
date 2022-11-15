<template>
  <base-form
    :form-config="formConfig"
    :model="formModel"
    :form-span="12"
    :btn-span="24"
    style="padding: 0 20px"
    @on-change="changeForm"
    @on-focus="focusForm"
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
      <el-button type="primary" @click="saveClick">保存</el-button>
    </template>
  </base-form>
</template>

<script>
import { POST } from "../../packages/http";

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
          startKey: "planStartDate",
          endKey: "planEndDate",
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
      const { executionCompanyCode } = this.data;
      if (executionCompanyCode) {
        this.formConfig.$get("siteCode").params = {
          level: 2,
          ids: [executionCompanyCode],
        };
        this.formConfig.$get("materialId").params = {
          companyIds: [executionCompanyCode],
        };
      }
    } else {
      this.formConfig = this.formConfig.filter(
        (item) =>
          item.prop !== "createTime" &&
          item.prop !== "creator" &&
          item.prop !== "planOrderNo"
      );
      this.formConfig.$get("siteCode").immediate = false;
      this.formConfig.$get("materialId").immediate = false;
    }
  },
  methods: {
    changeForm(key, data) {
      if (key === "executionCompanyCode" && data) {
        this.formConfig.$get("siteCode").params = { level: 2, ids: [data.id] };
        this.formConfig.$get("materialId").params = { companyIds: [data.id] };
      } else if (key === "materialId") {
        this.formModel.goodsAttribute = data.propId;
        this.formModel.productNameCode = data.nameId;
        this.formModel.productCategories = data.typeId;
        this.$forceUpdate();
      }
    },
    focusForm(key) {
      if (
        ["siteCode", "materialId"].includes(key) &&
        !this.formModel.executionCompanyCode
      ) {
        this.$message({ type: "error", message: "请先选择执行单位" });
      }
    },
    saveClick() {
      const params = {
        ...this.formModel,
        planTotalQuantity: this.formModel.planTotalQuantity * 1000,
      };
      POST("/portal/api/dryingPlan/addDryingPlan", params).then(() => {
        this.$message({ type: "success", message: "新增成功" });
        this.close();
      });
    },
    close() {
      this.$emit("update:visible", false);
    },
  },
};
</script>

<style scoped></style>
