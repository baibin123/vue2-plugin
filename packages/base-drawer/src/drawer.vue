<template>
  <span style="padding: 0 10px">
    <el-button :type="type" @click="drawer = true">{{ label }}</el-button>
    <el-drawer
      :visible.sync="drawer"
      v-bind="$attrs"
      v-on="$listeners"
      :destroy-on-close="destroyOnClose"
      :size="size"
      append-to-body
    >
      <div style="background: #fff">
        <component :is="component" :data="data"></component>
      </div>
    </el-drawer>
  </span>
</template>

<script>
export default {
  name: "BaseDrawer",
  provide() {
    return {
      baseDrawer: this,
    };
  },
  props: {
    component: {
      type: Object,
      required: true,
    },
    data: {
      type: [Object, Array],
    },
    size: {
      type: [String, Number],
      default: "75%",
    },
    label: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "primary",
    },
    destroyOnClose: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      drawer: false,
    };
  },
};
</script>

<style scoped></style>
