<template>
  <el-input
    v-model="innerValue"
    :clearable="clearable"
    v-bind="$attrs"
    v-on="$listeners"
    @change="change"
    @focus="focus"
  >
    <template #[slotName] v-for="(_, slotName) in $slots">
      <slot :name="slotName" />
    </template>
  </el-input>
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
    focus() {
      this.baseForm.$emit("on-focus", this.$attrs.prop, this.innerValue);
    },
  },
};
</script>

<style scoped></style>
