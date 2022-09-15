<template>
  <el-form :model="innerModal" v-bind="$attrs" v-on="$listeners">
    <el-row :gutter="20">
      <el-col
        v-for="item of formData"
        :key="item.prop"
        :span="item.span || formSpan"
      >
        <form-item v-bind="item" />
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import FormItem from "./form-item";
export default {
  name: "BaseForm",
  provide() {
    return {
      formModel: this.innerModal,
      setFormModel: (key, val) => {
        this.formModel[key] = val;
      },
    };
  },
  components: { FormItem },
  props: {
    rules: Array,
    model: Object,
    formData: {
      type: Array,
      required: true,
      default: () => [],
    },
    formSpan: {
      type: Number,
      default: 8,
    },
  },
  watch: {
    model: {
      handler: function (nv) {
        this.innerModal = nv;
      },
      immediate: true,
      deep: true,
    },
  },
  data() {
    return {
      innerModal: {},
    };
  },
  created() {
    if (!this.model) {
      this.innerModal = this.formData.reduce(
        (obj, item) => ({ ...obj, [item.prop]: item.value }),
        {}
      );
    }
  },
  methods: {},
};
</script>

<style scoped></style>
