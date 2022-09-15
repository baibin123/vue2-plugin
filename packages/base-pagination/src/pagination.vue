<template>
  <el-pagination
    align="right"
    style="margin-top: 20px"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    background
    :current-page="page.pageNum"
    :page-sizes="[10, 15, 30, 50]"
    :page-size="page.pageSize"
    :layout="layout"
    :total="total"
  >
  </el-pagination>
</template>

<script>
export default {
  name: "BasePagination",
  props: {
    total: {
      type: Number,
      default: 0,
    },
    layout: {
      type: String,
      default: "total, sizes, prev, pager, next, jumper",
    },
    page: {
      type: Object,
      default: function () {
        return {
          pageNum: 1,
          pageSize: 10,
        };
      },
    },
  },
  methods: {
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.$emit("change", this.page);
    },
    handleCurrentChange(val) {
      this.page.pageNum = val;
      this.$emit("change", this.page);
    },
  },
};
</script>

<style scoped></style>
