<template>
  <el-table :data="tableData" border stripe v-bind="$attrs" v-on="$listeners">
    <!-- 业务数据列   -->
    <template v-for="col of innerColumns">
      <el-table-column
        v-if="!$scopedSlots[col.prop]"
        :key="col.prop"
        :label="col.label || (fields && fields[col.prop])"
        v-bind="col"
      />
      <el-table-column
        v-else-if="$scopedSlots[col.prop]"
        :key="col.prop"
        :label="col.label || (fields && fields[col.prop])"
        v-bind="col"
      >
        <template slot-scope="scope">
          <slot :name="col.prop" v-bind="scope" />
        </template>
      </el-table-column>
    </template>
    <!--  操作列    -->
    <el-table-column
      v-if="$scopedSlots.action"
      :width="actionWidth"
      fixed="right"
      label="操作"
    >
      <template slot-scope="scope">
        <slot name="action" v-bind="scope" />
      </template>
    </el-table-column>
    <!--  原生element table 支持  注意：不与上面同时支持  -->
    <template #[slotName] v-for="(_, slotName) in $slots">
      <slot
        :name="slotName"
        v-if="!innerColumns || innerColumns.length === 0"
      />
    </template>
  </el-table>
</template>

<script>
export default {
  name: "BaseTable",
  inheritAttrs: false,
  props: {
    tableData: Array,
    columns: Array,
    fields: {
      type: Object,
      default: () => {},
    },
    actionWidth: {
      type: String,
      default: "100px",
    },
  },
  data() {
    return {
      innerColumns: [],
    };
  },
  watch: {
    columns: {
      handler(nv) {
        this.innerColumns = [];
        nv?.forEach((item) => {
          if (typeof item === "string") {
            this.innerColumns.push({ prop: item });
          } else if (Object.keys(item).length === 1) {
            const [key] = Object.keys(item);
            this.innerColumns.push({ prop: key, width: item[key] });
          } else {
            this.innerColumns.push(item);
          }
        });
      },
      immediate: true,
    },
  },
};
</script>

<style scoped></style>
