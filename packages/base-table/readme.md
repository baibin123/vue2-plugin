### base-table

- [x] 支持配置 支持el-table 所有属性配置。注意：columns与el-table自带插槽不支持同时使用
```javascript
columns = [
  { prop: "name", label: "姓名" },
  { prop: "date", label: "出生日期" }
]
```

- [x] 支持自定义 slot

```vue
<base-table>
  <template #id="{row}">
    <span>{{row.id}}</span>
  </template>
</base-table>
```

- [x] 操作列默认自带三个按钮。根据是否传入监听方法判断是否显示
```vue
<base-table
  @onRemove="removeClick"
  @onDetail="detailClick"
  @onEdit="editClick"
></base-table>
```

