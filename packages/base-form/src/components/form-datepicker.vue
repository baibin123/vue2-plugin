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
    v-on="$listeners"
    @change="change"
    @focus="focus"
  >
    <template #[slotName] v-for="(_, slotName) in $slots">
      <slot :name="slotName" />
    </template>
  </el-date-picker>
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
    value: [String, Date, Array],
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
      handler() {
        if (this.$attrs.type === "daterange") {
          if (
            this.formModel?.[this.startKey] &&
            this.formModel?.[this.endKey]
          ) {
            this.innerValue = [
              this.formModel[this.startKey],
              this.formModel[this.endKey],
            ];
          } else {
            this.innerValue = [];
          }
        } else {
          this.innerValue = this.value;
        }
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
