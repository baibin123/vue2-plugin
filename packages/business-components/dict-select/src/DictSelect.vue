<template>
  <el-select v-model="innerValue" style="width: 100%" @change="change">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    >
    </el-option>
  </el-select>
</template>

<script>
import http from "../../../http";
export default {
  name: "DictSelect",
  props: {
    value: [String, Number, Object],
    code: {
      type: String,
      required: true,
    },
  },
  model: {
    event: "change",
    prop: "value",
  },
  data() {
    return {
      innerValue: this.value,
      options: [],
    };
  },
  created() {
    this.getDictData();
  },
  methods: {
    getDictData() {
      const params = {
        dictKey: this.code,
        page: { pageNo: 1, pageSize: 10 },
      };
      http.POST("/masterdata/api/dict/pageQuery", params).then(({ data }) => {
        if (data.list.length > 0) {
          this.options = JSON.parse(data.list[0].dictValue);
        }
      });
    },
    change() {
      this.$emit("change", this.innerValue);
    },
  },
};
</script>

<style scoped></style>
