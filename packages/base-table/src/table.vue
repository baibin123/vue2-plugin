<template>
  <div class="container">
    <customer-header
      :columns="innerColumns"
      :fields="fields"
      :url="url"
      :style="customerHeaderStyle"
      @on-save="resetColumnsConfig"
    />
    <el-table
      class="base-table"
      :data="tableData"
      v-if="showTable"
      border
      stripe
      v-bind="$attrs"
      v-on="$listeners"
    >
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
  </div>
</template>

<script>
import { getStoreData } from "../../util/common";
import CustomerHeader from "./components/customer-header";
export default {
  name: "BaseTable",
  inheritAttrs: false,
  components: { CustomerHeader },
  props: {
    tableData: Array,
    columns: Array,
    fields: {
      type: Object,
      default: () => {},
    },
    url: String,
    actionWidth: {
      type: String,
      default: "100px",
    },
  },
  data() {
    return {
      innerColumns: [],
      customerHeaderStyle: {},
      showTable: true,
    };
  },
  watch: {
    columns: {
      handler(nv) {
        this.innerColumns = [];
        this.resetColumns(nv);
        this.resetColumnsConfig();
      },
      immediate: true,
    },
  },
  methods: {
    resetColumns(nv) {
      this.innerColumns = [];
      nv?.forEach((item) => {
        if (typeof item === "string") {
          //简单写法，['prop']
          this.innerColumns.push({ prop: item });
        } else if (Object.keys(item).length === 1) {
          // 简单写法 [{prop: '100px'}]
          const [key] = Object.keys(item);
          this.innerColumns.push({ prop: key, width: item[key] });
        } else {
          //多配置写法[{prop: '', label: '', ...}]
          this.innerColumns.push(item);
        }
      });
    },
    setTableConfigStyle() {
      this.$nextTick(() => {
        const headerHeight =
          document.getElementsByTagName("thead")[0]?.offsetHeight;
        this.customerHeaderStyle = {
          position: "absolute",
          top: `${(headerHeight - 16) / 2}px`,
          right: "10px",
          zIndex: 999,
        };
      });
    },
    resetColumnsConfig() {
      const listConfig = getStoreData("_listConfig_")?.[this.url];
      if (listConfig?.length > 0) {
        this.innerColumns = listConfig
          .filter((conf) => conf.checked)
          .map((conf) => {
            const col = this.innerColumns.find((item) => {
              const label = item.label || this.fields[item.prop];
              return label === conf.label;
            });
            return { ...col, ...conf };
          });
      } else {
        this.resetColumns(this.columns);
        this.innerColumns = this.innerColumns.map((item) => {
          const label = item.label || this.fields[item.prop];
          item.label = label;
          item.checked = true;
          return item;
        });
      }
      this.showTable = false;
      setTimeout(() => {
        this.showTable = true;
        this.setTableConfigStyle();
      }, 0);
    },
  },
};
</script>

<style scoped>
.container {
  position: relative;
}
</style>
