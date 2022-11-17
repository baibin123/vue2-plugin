### base-list

- [x] 配置项 基本支持el-table的所有属性，额外属性如下
- url：url
- pageSize：分页，一页显示几条数据
- tabs：Array 是否显示tabs [{label: 未执行, name: '1'}]
- tabParamsKey: 参数对应的key
- params： 额外传的参数
- showPaging: 是否显示分页，默认true
- primaryKey：取后台返回数据的key值，默认records
- immediate: 是否立即搜索，默认true，如果否，需手动调用reload方法 this.$refs.list.reload();

```vue
 <base-list
  url="/portal/api/dryingPlan/findDryingPlan"
  :tabs="tabs"
  tabParamsKey="status"
  :fields="fields"
  :columns="columns"
  >
    <template #condition>
      <base-form :form-config="formConfig" :fields="fields" query />
    </template>
    <template #planTime="{ row }">
      <span>{{ row.planStartDate }} - {{ row.planEndDate }}</span>
    </template>
    <template #action="{ row }">
      <el-button type="primary" @click="detailClick(row)">详情</el-button>
    </template>
</base-list>
```
```javascript
let fields = { planOrderNo: "计划单号", createTime: "创建日期"}
let columns = [
  "planOrderNo",
  { prop: "createTime", label:"创建时间", width: "100" }
]
```

- [x] 手动刷新列表
```javascript
this.$refs.list.reload();
```

- [x] event
- on-finish(arg1)  arg1:表格数据 加载完成后回调