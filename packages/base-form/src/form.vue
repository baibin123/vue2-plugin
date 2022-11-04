<template>
  <el-form
    :model="innerModal"
    v-bind="$attrs"
    v-on="$listeners"
    :label-position="labelPosition"
    align="bottom"
    class="common-form"
  >
    <el-row :gutter="20">
      <el-col
        v-for="item of formData"
        :key="item.prop"
        :span="item.span || formSpan"
      >
        <form-item
          :value="innerModal[item.prop]"
          :label="item.label || (fields && fields[item.prop])"
          v-bind="item"
        />
      </el-col>
      <el-col :span="btnSpan" v-if="showBtn">
        <el-form-item v-if="$scopedSlots['customer-btns']">
          <slot name="customer-btns"></slot>
        </el-form-item>
        <el-form-item v-else-if="query" label="操作" class="form-btn-container">
          <el-button type="primary" @click="onQuery">查询</el-button>
          <el-button @click="onReset">重置</el-button>
          <slot name="query-other-btn"></slot>
        </el-form-item>
        <el-form-item v-else>
          <el-button @click="onCancel">取消</el-button>
          <el-button type="primary" @click="onSave">保存</el-button>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import FormItem from "./form-item";
export default {
  name: "BaseForm",
  inject: {
    baseList: {
      from: "baseList",
      default: () => ({}),
    },
  },
  provide() {
    return {
      formModel: this.innerModal,
      setFormModel: (key, val) => {
        this.innerModal[key] = val;
      },
    };
  },
  components: { FormItem },
  props: {
    rules: Array,
    model: Object,
    showBtn: {
      type: Boolean,
      default: true,
    },
    fields: {
      type: Object,
      default: () => {},
    },
    formData: {
      type: Array,
      required: true,
      default: () => [],
    },
    formSpan: {
      type: Number,
      default: 6,
    },
    btnSpan: {
      type: Number,
      default: 6,
    },
    labelPosition: {
      type: String,
      default: "top",
    },
    query: Boolean,
  },
  watch: {
    model: {
      handler: function (nv) {
        this.innerModal = nv;
      },
      immediate: true,
      deep: true,
    },
  },
  data() {
    return {
      text: "",
      innerModal: {},
    };
  },
  created() {
    if (!this.model) {
      this.innerModal = this.formData.reduce(
        (obj, item) => ({ ...obj, [item.prop]: item.value }),
        {}
      );
    }
  },
  methods: {
    onReset() {
      Object.keys(this.innerModal).forEach(
        (key) => (this.innerModal[key] = undefined)
      );
      this.$emit("on-search", {});
      this.baseList.onSearch && this.baseList.onSearch({});
    },
    onQuery() {
      this.$emit("on-search", this.innerModal);
      this.baseList.onSearch && this.baseList.onSearch(this.innerModal);
    },
    onCancel() {
      this.$emit("on-cancel");
    },
    onSave() {
      this.$emit("on-save", this.innerModal);
    },
  },
};
</script>

<style scoped>
>>> .form-btn-container .el-form-item__label {
  color: transparent;
}
.common-form {
  padding: 0 10px;
}
.common-form >>> .el-form-item__label {
  padding: 0 !important;
}
</style>
