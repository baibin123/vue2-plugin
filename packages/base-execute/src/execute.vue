<template>
  <span class="base-space">
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
    baseForm: {
      from: "baseForm",
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
    confirmButtonText: {
      type: String,
      default: "确定",
    },
    cancelButtonText: {
      type: String,
      default: "取消",
    },
    params: Object,
    closable: {
      type: Boolean,
      default: false,
    },
    refreshList: {
      type: Boolean,
      default: false,
    },
    validateForm: {
      type: Boolean,
      default: false,
    },
    method: {
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
          confirmButtonText: this.confirmButtonText,
          cancelButtonText: this.cancelButtonText,
          type: "warning",
        })
          .then(async () => {
            await this.$emit("before-submit");
            await this.submit();
          })
          .catch(() => {});
      } else {
        await this.$emit("before-submit");
        await this.submit();
      }
    },
    onCancel() {
      this.$emit("on-cancel");
    },
    async submit() {
      if (this.validateForm) {
        if (!this.baseForm)
          throw new Error("validateForm属性必须使用在Form表单内部");
        const validate = await this.baseForm.validateForm();
        if (!validate) return;
      }
      if (this.url) {
        this.innerLoading = true;
        http
          .request({ url: this.url, data: this.params, method: this.method })
          .then((res) => {
            this.closeDrawer();
            this.refreshTableList();
            this.$message.success(
              this.text ? `${this.text}成功！` : "操作成功！"
            );
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
