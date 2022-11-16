<template>
  <el-select
    v-model="innerValue"
    :filterable="filterable"
    remote
    reserve-keyword
    :placeholder="placeholder"
    :remote-method="remoteMethod"
    :loading="loading"
    @change="change"
    style="width: 100%"
    :clearable="clearable"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <el-option
      v-for="item in options"
      :key="item.forKey"
      :label="item.label"
      :value="item.value"
    >
      <span>{{ item.label }}</span>
      <span v-if="item.labelDis" :style="labelDisStyle">
        {{ item.labelDis }}
      </span>
    </el-option>
  </el-select>
</template>

<script>
import { POST } from "../../http";
import { isEqual } from "../../util/common";

export default {
  name: "RemoteSelect",
  props: {
    value: [String, Number, Array],
    url: {
      type: String,
      required: true,
    },
    params: Object,
    forKey: {
      type: [String, Number],
      default: "id",
    },
    labelKey: {
      type: String,
      default: "name",
    },
    valueKey: {
      type: String,
      default: "id",
    },
    labelDisKey: String,
    labelDisStyle: Object,
    searchKey: {
      type: String,
      default: "searchText",
    },
    immediate: {
      type: Boolean,
      default: true,
    },
    primaryKey: {
      type: String,
      default: "data",
    },
    filterable: Boolean,
    placeholder: String,
    clearable: {
      type: Boolean,
      default: true,
    },
    isCompare: {
      type: Boolean,
      default: true,
    },
  },
  model: {
    prop: "value",
    event: "change",
  },
  data() {
    return {
      options: [],
      loading: false,
      innerValue: null,
    };
  },
  watch: {
    value: {
      handler: function (nv) {
        this.innerValue = nv;
      },
      immediate: true,
    },
    params: function (nv, ov) {
      if (!this.isCompare || !isEqual(nv, ov)) {
        this.remoteMethod();
      }
    },
  },
  created() {
    if (this.immediate) {
      this.remoteMethod();
    }
  },
  methods: {
    remoteMethod(query) {
      this.searchText = query;
      const params = {
        ...this.params,
        [this.searchKey]: query,
      };
      this.loading = true;
      POST(this.url, params)
        .then((res) => {
          this.loading = false;
          this.options = res[this.primaryKey].map((item) => {
            if (!this.labelKey && !this.valueKey) return item;
            return {
              ...item,
              label: item?.[this.labelKey],
              labelDis: item?.[this.labelDisKey],
              value: item?.[this.valueKey],
            };
          });
        })
        .catch((err) => {
          this.loading = false;
          return err;
        });
    },
    change(value) {
      this.$emit("change", this.innerValue);
      this.$emit(
        "on-select",
        this.options.find((item) => item[this.valueKey] === value)
      );
    },
  },
};
</script>

<style scoped></style>
