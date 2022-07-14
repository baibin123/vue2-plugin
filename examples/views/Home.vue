<template>
  <div class="home">
    <base-table
      :data="tableData"
      :columns="columns"
      @onRemove="removeClick"
      @onDetail="detailClick"
      @onEdit="editClick"
    />
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
  data() {
    return {
      columns: [
        { prop: "name", label: "姓名" },
        { prop: "date", label: "出生日期" },
        { prop: "address", label: "出生地址" },
      ],
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
    };
  },
  methods: {
    removeClick(data) {
      console.log(data);
    },
    detailClick(data) {
      console.log(data);
    },
    editClick(data) {
      console.log(data);
    },
  },
};
</script>
