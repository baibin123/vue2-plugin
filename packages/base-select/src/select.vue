<template>
  <el-select :clearable="clearable" v-bind="$attrs" v-on="$listeners">
  </el-select>
</template>

<script>
export default {
  name: "BaseSelect",
  props: {
    clearable: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style scoped></style>
