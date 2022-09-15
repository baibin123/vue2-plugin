<template>
  <base-list
    :table-data="tableData"
    :form-data="formData"
    :model="formModel"
    :columns="columns"
    @onRemove="removeClick"
    @onDetail="detailClick"
    @onEdit="editClick"
  >
    <template #gender="{ row }">
      <span>{{ row.gender }}</span>
    </template>
  </base-list>
</template>

<script>
export default {
  name: "Home",
  components: {},
  data() {
    return {
      formData: [
        { type: "input", prop: "name", label: "姓名" },
        { type: "input", prop: "date", label: "出生日期" },
        { type: "select", prop: "gender", label: "性别" },
      ],
      formModel: { name: "张三", date: "2022-02-02" },
      columns: [
        { prop: "name", label: "姓名" },
        { prop: "date", label: "出生日期" },
        { prop: "gender", label: "性别" },
        { prop: "address", label: "出生地址" },
      ],
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          gender: "男",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          gender: "男",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          gender: "男",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          gender: "男",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
    };
  },
  created() {
    //let i = 0;
    // setInterval(() => {
    //   this.formModel.name = "李思" + i;
    //   i++;
    // }, 1000);
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
