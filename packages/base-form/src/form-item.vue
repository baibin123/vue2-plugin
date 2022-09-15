<template>
  <el-form-item :label="label" :prop="prop" :label-width="labelWidth">
    <component
      :is="'form-' + type"
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
    type: String,
    labelWidth: {
      type: String,
      default: "auto",
    },
  },
};
</script>

<style scoped></style>
