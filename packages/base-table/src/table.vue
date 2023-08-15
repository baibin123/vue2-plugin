<template>
  <div class="container">
    <customer-header
      :columns="columns"
      :fields="fields"
      :url="url"
      :style="customerHeaderStyle"
      @on-save="resetColumnsConfig"
    />
    <el-table
      class="base-table"
      :data="tableData"
      ref="baseTableRef"
      border
      stripe
      v-bind="$attrs"
      v-on="$listeners"
    >
      <!-- 业务数据列   -->
      <template v-for="col of innerColumns">
        <el-table-column
          v-if="!$scopedSlots[col.prop]"
          :key="col.key"
          :label="col.label"
          v-bind="col"
        />
        <el-table-column
          v-else-if="$scopedSlots[col.prop]"
          :key="col.key"
          :label="col.label"
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
        :width="actionWidth || innerActionWidth"
        fixed="right"
        label="操作"
      >
        <template slot-scope="scope">
          <div class="action-column-container">
            <slot name="action" v-bind="scope" />
          </div>
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
import {
  getStoreData,
  uniqueKey,
  setStoreData,
  isEqual,
} from "../../util/common";
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
    actionWidth: String,
  },
  data() {
    return {
      innerColumns: [],
      innerActionWidth: "100",
      customerHeaderStyle: {},
    };
  },
  watch: {
    columns: {
      handler(nv, ov) {
        if (!isEqual(nv, ov)) {
          this.resetColumns();
          this.resetColumnsConfig();
        }
      },
      immediate: true,
      deep: true,
    },
    tableData(nv, ov) {
      if (!isEqual(nv, ov)) {
        this.$nextTick(() => this.setTableConfigStyle());
      }
    },
  },
  methods: {
    resetColumns() {
      this.innerColumns = [];
      this.columns.forEach((item, index) => {
        const key = `${item.prop}_${index}`;
        if (typeof item === "string") {
          //简单写法，['prop']
          this.innerColumns.push({ prop: item, label: this.fields[item], key });
        } else if (Object.keys(item).length === 1) {
          // 简单写法 [{prop: '100px'}]
          const [prop] = Object.keys(item);
          this.innerColumns.push({
            prop,
            label: this.fields[prop],
            width: item[prop],
            key,
          });
        } else {
          //多配置写法[{prop: '', label: '', ...}]
          item.key = key;
          this.innerColumns.push(item);
        }
      });
    },
    //列配置
    resetColumnsConfig() {
      this.resetColumns(this.columns);
      let listConfig = getStoreData("_listConfig_")?.[this.url];
      if (listConfig?.length > 0) {
        //判断，如果缓存里有的列，在columns里没有，则认为这一列为脏数据，移除并重新缓存
        const filterArray = listConfig.filter((item) =>
          this.innerColumns.some((sub) => sub.prop === item.prop)
        );
        if (filterArray.length !== listConfig.length) {
          listConfig = filterArray;
          setStoreData("_listConfig_", {
            [this.url]: listConfig,
          });
        }
        //判断，如果columns有的列，listConfig没有，则为新增的列。加入缓存，checked赋值为true
        const newArray = this.innerColumns
          .filter((item) => !listConfig.some((sub) => sub.prop === item.prop))
          .map((item) => ({ ...item, checked: true }));
        if (newArray.length > 0) {
          listConfig = [...listConfig, ...newArray];
          setStoreData("_listConfig_", {
            [this.url]: listConfig,
          });
        }
        this.innerColumns = listConfig
          .filter((item) => item.checked)
          .map((item) => ({
            ...this.innerColumns.$get(item.prop),
            key: uniqueKey(),
          }));
      }
    },
    setTableConfigStyle() {
      const tableDom = this.$refs.baseTableRef.$el;
      //设置按钮位置
      const headerHeight =
        tableDom.getElementsByTagName("thead")[0]?.offsetHeight;
      //如果headerHeight == 0 表示有tabs，且不是当前选中的tab页面,所以不需要设置action的宽度
      if (headerHeight === 0) return;
      this.customerHeaderStyle = {
        position: "absolute",
        top: `${(headerHeight - 16) / 2}px`,
        right: "10px",
        zIndex: 999,
      };
      //设置action宽度
      const actionWidths = [
        ...tableDom.getElementsByClassName("action-column-container"),
      ]
        .map((item) => item.offsetWidth)
        .sort();
      this.innerActionWidth = actionWidths?.[0] + 20;
    },
  },
};
</script>

<style scoped>
.container {
  position: relative;
}
.action-column-container {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: fit-content;
}
</style>
