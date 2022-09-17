<template>
  <el-date-picker
    v-model="innerValue"
    :clearable="clearable"
    style="width: 100%"
    placement="bottom-start"
    :placeholder="placeholder"
    :value-format="valueFormat"
    v-bind="$attrs"
  />
</template>

<script>
export default {
  name: "form-datepicker",
  inject: ["formModel", "setFormModel"],
  props: {
    clearable: {
      type: Boolean,
      default: true,
    },
    value: [String, Date],
    placeholder: {
      type: String,
      default: "请选择时间",
    },
    valueFormat: {
      type: String,
      default: "yyyy-MM-dd",
    },
  },
  data() {
    return {
      innerValue: undefined,
    };
  },
  watch: {
    innerValue(nv, ov) {
      if (nv !== ov) this.setFormModel(this.$attrs.prop, nv);
    },
    value: {
      handler(nv, ov) {
        if (nv !== ov) this.innerValue = this.value;
      },
      immediate: true,
    },
  },
};
</script>

<style scoped></style>
