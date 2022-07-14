<template>
  <div>
    <el-table :data="data" :v-bind="$attrs">
      <template v-for="col of columns">
        <el-table-column
          v-if="!$scopedSlots[col.prop]"
          :key="col.prop"
          v-bind="col"
        />
        <el-table-column
          v-else-if="$scopedSlots[col.prop]"
          :key="col.prop"
          v-bind="col"
        >
          <template slot-scope="scope">
            <slot :name="col.prop" v-bind="scope" />
          </template>
        </el-table-column>
      </template>
      <el-table-column
        v-if="$listeners.onEdit || $listeners.onDetail || $listeners.onRemove"
        label="操作"
        fixed="right"
      >
        <template slot-scope="scope">
          <el-button
            v-if="$listeners.onDetail"
            @click="$listeners.onDetail(scope)"
            type="primary"
            >详情</el-button
          >
          <el-button
            v-if="$listeners.onEdit"
            @click="$listeners.onEdit(scope)"
            type="primary"
            >编辑</el-button
          >
          <el-button
            v-if="$listeners.onRemove"
            @click="$listeners.onRemove(scope)"
            type="danger"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "BaseTable",
  props: {
    data: Array,
    columns: Array,
  },
};
</script>

<style scoped></style>
