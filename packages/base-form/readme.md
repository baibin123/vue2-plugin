### base-form

- [x] 支持配置 基本支持el-form所有属性配置，额外配置如下
- formConfig: 表单配置
- modal: _注意赋初值不能为undefined或null_
- fields: 表单label
- query: 代表是否是查询表单
- formSpan: formSpan
- showBtn: 是否显示按钮
- btnSpan: 按钮span
- labelPosition: label的位置，默认TOP
- anchor-key: 锚点，用于滚动到校验有问题的字段，注意需要保证全局唯一
```javascript
let fields = { name: "姓名" }
let formConfig = [
  { prop: "name", label: "输入框，优先级大于fields", kind: "input", span:"优先级大于formSpan" },//对象里的所有配置将会被kind:input继承
  { prop: "", label: "字典", kind: "dict-select", code: "字典code" },
  { prop: "", label: "下拉框", kind: "select", options: [{label: "男", value: 1},{label: "女", value: 2}] },
  { prop: "", label: "远程取值", kind: "remote-select", url: "xxx", params: { level: 1 }, labelKey: '', valueKey: ''   },
  { prop: "", label: "日期框", kind: "datepicker", type: "daterange", startKey: "传入后台的key", endKey: "传入后台的key", },
  { prop: "id", label: "自定义插槽" },
  { prop: "goods", keys: ["code", "name"] }, //自定义插槽，keys: 将会增加到form里modal的属性里
]
```
```vue
<template #id="{ model }">
  <input v-model="model.id" />
</template>
<template #goods="{ model }">
  <goods-select :code.sync="model.code" :code.sync="model.code" />
</template>
<template #actions>
  <el-button>保存</el-button>
</template>
```
- [x] base-form-item  注意此节点与formConfig互斥
- kind: 取值包括 input、select、dict-select、remote-select、datepicker
```vue
<base-form :model="formModel">
  <base-form-item kind="input" prop="creator" v-model="formModel.creator" label="创建人">
    <template slot="prepend">Http://</template>
  </base-form-item>
  <base-form-item v-model="formModel.creator" kind="select" prop="creator" :options="[]" label="创建人" />
</base-form>
```

- [x] event
- on-change(arg1, arg2)  arg1:改变的是哪个key arg2：改变后的value
- on-focus(arg1, arg2) arg1:聚焦的是哪个key arg2：聚焦时的value
- on-search(arg1) arg1:modal 只有query=ture时有回调
- on-cancel 只有query=false 取消按钮回调
- on-save(arg1) arg1:modal 只有query=false 保存按钮回调
