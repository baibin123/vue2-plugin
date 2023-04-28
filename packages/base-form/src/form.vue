<template>
  <el-form
    ref="baseFormRef"
    :model="innerModel"
    v-bind="$attrs"
    v-on="$listeners"
    :label-position="labelPosition"
    class="common-form"
    @validate="onValidate"
  >
    <el-row :gutter="20" v-if="formConfig.length > 0">
      <template v-for="item of formConfig">
        <span v-if="$scopedSlots[item.prop]" :key="item.prop">
          <slot :name="item.prop" :model="innerModel" />
        </span>
        <el-col v-else :key="item.prop" :span="item.span || formSpan">
          <form-item
            :id="anchorKey + '_' + item.prop"
            :value="innerModel[item.prop]"
            :label="item.label || (fields && fields[item.prop])"
            v-bind="item"
          />
        </el-col>
      </template>
      <el-col :span="btnSpan" v-if="showBtn">
        <el-form-item v-if="$scopedSlots['actions']">
          <slot name="actions"></slot>
        </el-form-item>
        <el-form-item v-else-if="query" label="操作" class="form-btn-container">
          <el-button type="primary" @click="onQuery">查询</el-button>
          <el-button @click="onReset">重置</el-button>
          <slot name="query-other-btn"></slot>
        </el-form-item>
        <el-form-item v-else>
          <el-button @click="onCancel">取消</el-button>
          <el-button type="primary" @click="onSave">保存</el-button>
        </el-form-item>
      </el-col>
    </el-row>
    <slot v-else />
  </el-form>
</template>

<script>
import FormItem from "./form-item";
import { debounce, isEqual } from "../../util/common";

export default {
  name: "BaseForm",
  inject: {
    baseList: {
      from: "baseList",
      default: () => ({}),
    },
  },
  provide() {
    return {
      baseForm: this,
      formModel: this.innerModel,
      setFormModel: (key, val) => {
        this.innerModel[key] = val;
      },
    };
  },
  components: { FormItem },
  props: {
    model: Object,
    showBtn: {
      type: Boolean,
      default: true,
    },
    fields: {
      type: Object,
      default: () => {},
    },
    formConfig: {
      type: Array,
      default: () => [],
    },
    formSpan: {
      type: Number,
      default: 6,
    },
    btnSpan: {
      type: Number,
      default: 6,
    },
    labelPosition: {
      type: String,
      default: "top",
    },
    query: Boolean,
    anchorKey: {
      type: String,
      default: "",
    },
  },
  watch: {
    model: {
      handler: function (nv) {
        this.setInnerModel(nv);
      },
      immediate: true,
      deep: true,
    },
  },
  data() {
    return {
      innerModel: {},
    };
  },
  methods: {
    setInnerModel(nv) {
      if (nv && Object.keys(nv).length > 0) {
        this.innerModel = nv;
      } else {
        //判断如果modal传入{}空对象，则优先赋值给innerModel。让其指向父组件modal的内存地址。这样子组件改变了innerModel的值，父组件的modal值也会改变
        if (isEqual(nv, {})) this.innerModel = nv;
        this.formConfig.forEach((item) => {
          if (item.keys?.length > 0) {
            item.keys.forEach((sub) => {
              this.$set(this.innerModel, sub, undefined);
            });
          } else {
            this.$set(this.innerModel, item.prop, undefined);
          }
        });
      }
    },
    onReset() {
      Object.keys(this.innerModel).forEach(
        (key) => (this.innerModel[key] = undefined)
      );
      this.$emit("on-search", this.innerModel);
      this.baseList.onSearch && this.baseList.onSearch(this.innerModel);
    },
    onQuery() {
      this.$emit("on-search", this.innerModel);
      this.baseList.onSearch && this.baseList.onSearch(this.innerModel);
    },
    onCancel() {
      this.$emit("on-cancel");
    },
    validateForm() {
      return new Promise((resolve) => {
        this.$refs.baseFormRef.validate((res) => {
          resolve(res);
        });
      });
    },
    onValidate(prop, validate) {
      if (!validate && this.anchorKey) {
        this.scrollView(`${this.anchorKey}_${prop}`);
      }
    },
    scrollView: debounce((id) => {
      document
        .getElementById(id)
        ?.scrollIntoView({ block: "start", behavior: "smooth" });
    }, 300),
    onSave() {
      this.$emit("on-save", this.innerModel);
    },
  },
};
</script>

<style scoped>
.el-col {
  min-height: 82.5px;
}
.common-form {
  padding: 0 10px;
  overflow-y: auto;
}
.common-form .form-btn-container >>> .el-form-item__label {
  color: transparent !important;
}
.common-form >>> .el-form-item__label {
  padding: 0 !important;
}
</style>
