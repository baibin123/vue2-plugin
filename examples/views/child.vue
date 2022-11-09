<template>
  <div>
    <slot name="customer" :model="test" />
    <el-input :value="test.a" />
  </div>
</template>

<script>
export default {
  name: "child",
  data() {
    return {
      test: {},
    };
  },
  created() {
    this.test = { a: 1 };
  },
};
</script>

<style scoped></style>
