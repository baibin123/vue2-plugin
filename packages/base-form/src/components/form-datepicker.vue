<template>
  <el-date-picker
    v-model="innerValue"
    :clearable="clearable"
    style="width: 100%"
    placement="bottom-start"
    :placeholder="placeholder"
    :range-separator="rangeSeparator"
    :value-format="valueFormat"
    v-bind="$attrs"
    @change="change"
  />
</template>

<script>
export default {
  name: "form-datepicker",
  inject: ["formModel", "setFormModel", "baseForm"],
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
    startKey: String,
    endKey: String,
    rangeSeparator: {
      type: String,
      default: "至",
    },
  },
  data() {
    return {
      innerValue: undefined,
    };
  },
  watch: {
    innerValue(nv, ov) {
      if (nv !== ov) {
        if (Array.isArray(nv) && this.startKey && this.endKey) {
          const [startDate, endDate] = nv;
          this.setFormModel(this.startKey, startDate);
          this.setFormModel(this.endKey, endDate);
        } else {
          this.setFormModel(this.$attrs.prop, nv);
        }
      }
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
