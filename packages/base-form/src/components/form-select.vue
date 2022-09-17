<template>
  <el-select
    v-model="innerValue"
    :clearable="clearable"
    v-bind="$attrs"
    style="width: 100%"
  >
    <el-option
      v-for="opt of options"
      :key="opt.value"
      :value="opt.value"
      :label="opt.label"
    />
  </el-select>
</template>

<script>
export default {
  name: "form-select",
  inject: ["formModel", "setFormModel"],
  props: {
    clearable: {
      type: Boolean,
      default: true,
    },
    options: {
      type: Array,
      default: () => [],
    },
    value: [String, Number],
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
      handler: function (nv, ov) {
        if (nv !== ov) this.innerValue = this.value;
      },
      immediate: true,
    },
  },
};
</script>

<style scoped></style>
