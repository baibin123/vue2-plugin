<template>
  <span>
    <el-popconfirm
      v-if="tip"
      :confirm-button-text="tipConfirmText"
      :cancel-button-text="tipCancelText"
      :title="tip"
    >
      <el-button v-bind="$attrs" @click="onClick">{{ text }} </el-button>
    </el-popconfirm>
    <el-button v-else v-bind="$attrs" @click="onClick">{{ text }} </el-button>
  </span>
</template>

<script>
import http from "../../http";

export default {
  name: "BaseExecute",
  inject: {
    baseDrawer: {
      from: "baseDrawer",
      default: null,
    },
  },
  props: {
    url: String,
    tip: String,
    tipType: {
      type: String,
      default: "",
    },
    tipConfirmText: {
      type: String,
      default: "确定",
    },
    tipCancelText: {
      type: String,
      default: "取消",
    },
    confirm: String,
    params: Object,
    closable: {
      type: Boolean,
      default: false,
    },
    mode: {
      type: String,
      default: "post",
    },
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
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.submit();
          })
          .catch(() => {});
      } else {
        this.submit();
      }
    },
    submit() {
      if (this.url) {
        http[this.mode.toUpperCase()](this.url, this.params).then((res) => {
          this.closeDrawer();
          this.$emit("on-finish", res);
        });
      } else {
        this.closeDrawer();
      }
    },
    closeDrawer() {
      if (this.closable && this.baseDrawer) {
        this.baseDrawer.drawer = false;
      }
    },
  },
};
</script>

<style scoped></style>
