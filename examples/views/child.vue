<template>
  <div>
    <slot name="customer" :model="test" />
  </div>
</template>

<script>
export default {
  name: "child",
  data() {
    return {
      test: {
        a: 111,
      },
    };
  },
  created() {
    this.aa = { a: 111 };
  },
  methods: {},
};
</script>

<style scoped></style>
