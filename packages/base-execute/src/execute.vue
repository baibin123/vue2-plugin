<template>
  <span>
    <el-popconfirm
      v-if="tip"
      :confirm-button-text="tipConfirmText"
      :cancel-button-text="tipCancelText"
      :title="tip"
      @confirm="onClick"
      @cancel="onCancel"
    >
      <el-button v-bind="$attrs" slot="reference">{{ text }} </el-button>
    </el-popconfirm>
    <el-button v-else v-bind="$attrs" :loading="innerLoading" @click="onClick"
      >{{ text }}
    </el-button>
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
    baseList: {
      from: "baseList",
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
    refreshList: {
      type: Boolean,
      default: false,
    },
    mode: {
      type: String,
      default: "post",
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    text() {
      const [{ text }] = this.$slots.default;
      return text;
    },
  },
  data() {
    return {
      innerLoading: false,
    };
  },
  watch: {
    loading(nv) {
      this.innerLoading = nv;
    },
  },
  methods: {
    async onClick() {
      if (!this.url) {
        return this.$emit("on-click");
      }
      if (this.confirm) {
        this.$confirm(this.confirm, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(async () => {
            await this.$emit("before-submit");
            this.submit();
          })
          .catch(() => {});
      } else {
        await this.$emit("before-submit");
        this.submit();
      }
    },
    onCancel() {
      this.$emit("on-cancel");
    },
    submit() {
      if (this.url) {
        this.innerLoading = true;
        http[this.mode.toUpperCase()](this.url, this.params)
          .then((res) => {
            this.closeDrawer();
            this.refreshTableList();
            this.$emit("on-finish", res);
          })
          .finally(() => {
            this.innerLoading = false;
          });
      } else {
        this.closeDrawer();
      }
    },
    refreshTableList() {
      if (this.refreshList && this.baseList) {
        this.baseList.reload();
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
