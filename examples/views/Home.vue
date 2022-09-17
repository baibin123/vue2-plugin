<template>
  <base-list
    :table-data="tableData"
    :form-data="formData"
    :fields="fields"
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
      fields: {
        name: "姓名",
        date: "出生日期",
        gender: "性别",
        address: "地址",
      },
      formData: [
        { prop: "name", kind: "input" },
        { prop: "date", kind: "datepicker", type: "date" },
        {
          prop: "gender",
          kind: "select",
          options: [
            { label: "男", value: 1 },
            { label: "女", value: 2 },
          ],
        },
      ],
      columns: [
        { prop: "name" },
        { prop: "date" },
        { prop: "gender" },
        { prop: "address" },
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
