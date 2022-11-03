<template>
  <el-table :data="tableData" border stripe v-bind="$attrs" v-on="$listeners">
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
