<template>
  <el-input :clearable="clearable" v-bind="$attrs" v-on="$listeners">
    <template #[slotName] v-for="(_, slotName) in $slots">
      <slot :name="slotName" />
    </template>
  </el-input>
</template>

<script>
export default {
  name: "BaseInput",
  props: {
    clearable: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style scoped></style>
