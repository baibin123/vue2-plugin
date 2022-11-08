<template>
  <div class="about">
    <h1>This is an about page</h1>
    <child #customer="{ model }">
      <el-input v-model="model.a" />
    </child>
  </div>
</template>
<script>
import child from "./child";
export default {
  components: { child },
  methods: {
    onClick(data) {
      console.log("****", data);
      data.a = 2222;
    },
  },
};
</script>
