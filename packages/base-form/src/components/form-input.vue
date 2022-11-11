<template>
  <el-input
    v-model="innerValue"
    :clearable="clearable"
    v-bind="$attrs"
    @change="change"
  />
</template>

<script>
export default {
  name: "form-input",
  inject: ["formModel", "setFormModel", "baseForm"],
  props: {
    clearable: {
      type: Boolean,
      default: true,
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
      handler(nv, ov) {
        if (nv !== ov) this.innerValue = this.value;
      },
      immediate: true,
    },
  },
  methods: {
    change() {
      this.baseForm.$emit("on-change", this.$attrs.prop, this.innerValue);
    },
  },
};
</script>

<style scoped></style>
