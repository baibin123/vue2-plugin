<template>
  <el-select
    v-model="value"
    :clearable="clearable"
    v-bind="$attrs"
    style="width: 100%"
  />
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
  },
  data() {
    return {
      value: undefined,
    };
  },
  watch: {
    value(nv, ov) {
      if (nv !== ov) this.setFormModel(this.prop, nv);
    },
  },
  created() {
    this.value = this.formModel[this.prop];
  },
};
</script>

<style scoped></style>
