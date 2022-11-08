<template>
  <div>
    <el-col :span="span">
      <el-form-item label="货品类别">
        <remote-select
          v-model="productCategories"
          url="/portal/api/Material/allMaterialMaintenance"
          :params="{ materialLevel: 3 }"
          @on-select="categoryChange"
          value-key="code"
        />
      </el-form-item>
    </el-col>
    <el-col :span="span">
      <el-form-item label="货品名称">
        <remote-select
          v-model="productNameCode"
          url="/portal/api/Material/allMaterialMaintenance"
          :immediate="false"
          :params="productNameParams"
          @on-select="productNameChange"
          value-key="code"
        />
      </el-form-item>
    </el-col>
  </div>
</template>

<script>
export default {
  name: "GoodsSelect",
  props: {
    span: {
      type: Number,
      default: 6,
    },
    value: Object,
  },
  data() {
    return {
      productCategories: this.value.productCategories,
      productNameCode: this.value.productNameCode,
      productNameParams: undefined,
    };
  },
  mounted() {
    if (this.value.productCategories) {
      this.productNameParams = {
        materialLevel: 4,
        parentCode: this.value.productCategories,
      };
    }
  },
  methods: {
    categoryChange(data) {
      this.productNameParams = {
        materialLevel: 4,
        parentCode: data.code,
      };
      this.$emit("category-selected", data);
      this.$emit("input", {
        productCategories: this.productCategories,
        productNameCode: undefined,
      });
    },
    productNameChange(data) {
      this.$emit("productName-selected", data);
      this.$emit("input", {
        productCategories: this.productCategories,
        productNameCode: this.productNameCode,
      });
    },
  },
};
</script>

<style scoped></style>
