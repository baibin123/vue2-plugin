<template>
  <remote-select
    v-model="innerValue"
    v-bind="$attrs"
    v-on="$listeners"
    @on-select="change"
    @focus="focus"
  />
</template>

<script>
export default {
  name: "form-remote-select",
  inject: ["formModel", "setFormModel", "baseForm"],
  props: {
    value: [String, Number, Array],
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
    change(data) {
      this.baseForm.$emit("on-change", this.$attrs.prop, data);
    },
    focus() {
      this.baseForm.$emit("on-focus", this.$attrs.prop, this.innerValue);
    },
  },
};
</script>

<style scoped></style>
