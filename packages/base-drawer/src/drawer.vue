<template>
  <span class="base-space">
    <el-button :type="type" :disabled="disabled" @click="onClick">{{
      text
    }}</el-button>
    <el-drawer
      :visible.sync="drawer"
      v-bind="$attrs"
      v-on="$listeners"
      :destroy-on-close="destroyOnClose"
      :size="size"
      append-to-body
    >
      <component :is="component" :data="data"></component>
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
    type: {
      type: String,
      default: "primary",
    },
    destroyOnClose: {
      type: Boolean,
      default: true,
    },
    confirm: String,
    confirmButtonText: {
      type: String,
      default: "确定",
    },
    cancelButtonText: {
      type: String,
      default: "取消",
    },
    disabled: Boolean,
  },
  data() {
    return {
      drawer: false,
    };
  },
  computed: {
    text() {
      const [{ text }] = this.$slots.default;
      return text;
    },
  },
  methods: {
    onClick() {
      if (this.confirm) {
        this.$confirm(this.confirm, "提示", {
          confirmButtonText: this.confirmButtonText,
          cancelButtonText: this.cancelButtonText,
          type: "warning",
        })
          .then(async () => {
            this.drawer = true;
          })
          .catch(() => {});
      } else {
        this.drawer = true;
      }
    },
  },
};
</script>
