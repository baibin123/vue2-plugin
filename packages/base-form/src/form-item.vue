<template>
  <el-form-item :label="label" :prop="prop" :label-width="labelWidth">
    <component
      :is="'form-' + kind"
      :prop="prop"
      v-bind="$attrs"
      v-on="$listeners"
    />
  </el-form-item>
</template>

<script>
import * as formComponents from "./components";

export default {
  name: "form-item",
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
