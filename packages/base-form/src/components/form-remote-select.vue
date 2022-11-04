<template>
  <remote-select v-model="innerValue" v-bind="$attrs" v-on="$listeners" />
</template>

<script>
export default {
  name: "form-remote-select",
  inject: ["formModel", "setFormModel"],
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
};
</script>

<style scoped></style>
