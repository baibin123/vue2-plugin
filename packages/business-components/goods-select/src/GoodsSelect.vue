<template>
  <span>
    <el-col :span="span">
      <el-form-item label="货品类别">
        <remote-select
          :disabled="disabled"
          v-model="innerProductCategories"
          url="/portal/api/Material/allMaterialMaintenance"
          :params="{ materialLevel: 3 }"
          @on-select="categoryChange"
        />
      </el-form-item>
    </el-col>
    <el-col :span="span">
      <el-form-item label="货品名称">
        <remote-select
          v-model="innerProductNameCode"
          :disabled="disabled"
          url="/portal/api/Material/allMaterialMaintenance"
          :immediate="false"
          :params="productNameParams"
          @on-select="productNameChange"
        />
      </el-form-item>
    </el-col>
  </span>
</template>

<script>
export default {
  name: "GoodsSelect",
  inject: {
    baseForm: {
      from: "baseForm",
      default: () => null,
    },
  },
  props: {
    span: {
      type: Number,
      default: 6,
    },
    value: Object,
    productCategories: [String, Number],
    productNameCode: [String, Number],
    disabled: Boolean,
  },
  data() {
    return {
      innerProductCategories: null,
      innerProductNameCode: null,
      productNameParams: undefined,
    };
  },
  watch: {
    value: {
      handler(nv) {
        this.innerProductCategories = nv?.productCategories;
        this.innerProductNameCode = nv?.productNameCode;
      },
      immediate: true,
    },
    productCategories: {
      handler(nv) {
        this.innerProductCategories = nv;
      },
      immediate: true,
    },
    productNameCode: {
      handler(nv) {
        this.innerProductNameCode = nv;
      },
      immediate: true,
    },
  },
  mounted() {
    //有初值的情况。改变params触发调用接口。查询下拉数据
    const parentId = this.value?.productCategories || this.productCategories;
    if (parentId) {
      this.productNameParams = {
        materialLevel: 4,
        parentId,
      };
    }
  },
  methods: {
    //货品类别改变
    categoryChange(data) {
      this.productNameParams = {
        materialLevel: 4,
        parentId: data.id,
      };
      //传递完整数据data
      this.$emit("category-selected", data);
      //支持v-model
      this.$emit("input", {
        productCategories: this.innerProductCategories,
        productNameCode: undefined,
      });
      //支持.sync修饰符
      this.$emit("update:productCategories", this.innerProductCategories);
      //适配baseForm on-change
      this.baseForm &&
        this.baseForm.$emit(
          "on-change",
          "productCategories",
          this.innerProductCategories
        );
    },
    //货品名称改变
    productNameChange(data) {
      //传递完整数据data
      this.$emit("productName-selected", data);
      //支持v-model
      this.$emit("input", {
        productCategories: this.innerProductCategories,
        productNameCode: this.innerProductNameCode,
      });
      //支持.sync修饰符
      this.$emit("update:productNameCode", this.innerProductNameCode);
      //适配baseForm on-change
      this.baseForm &&
        this.baseForm.$emit(
          "on-change",
          "productNameCode",
          this.innerProductNameCode
        );
    },
  },
};
</script>

<style scoped></style>
