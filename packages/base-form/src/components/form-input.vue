<template>
  <el-input v-model="value" :clearable="clearable" v-bind="$attrs" />
</template>

<script>
export default {
  name: "form-input",
  inject: ["formModel", "setFormModel"],
  props: {
    clearable: {
      type: Boolean,
      default: true,
    },
    prop: String,
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
    console.log("********", this.formModel, this.$attrs);
    this.value = this.formModel[this.prop];
  },
};
</script>

<style scoped></style>
