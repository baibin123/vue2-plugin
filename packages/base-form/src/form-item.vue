<template>
  <el-form-item :label="label" :prop="prop" :label-width="labelWidth">
    <component
      :is="'form-' + kind"
      :prop="prop"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <template #[slotName] v-for="(_, slotName) in $slots">
        <slot :name="slotName" />
      </template>
    </component>
  </el-form-item>
</template>

<script>
import * as formComponents from "./components";

export default {
  name: "BaseFormItem",
  components: {
    ...formComponents,
  },
  props: {
    label: String,
    prop: String,
    kind: {
      type: String,
      required: true,
    },
    labelWidth: {
      type: String,
      default: "120px",
    },
  },
};
</script>

<style scoped></style>
