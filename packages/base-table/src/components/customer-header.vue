<template>
  <el-popover v-model="visible" placement="right" trigger="click">
    <div>
      <div v-for="(col, index) of innerColumns" :key="index" class="item">
        <el-checkbox v-model="col.checked">
          {{ col.label }}
        </el-checkbox>
        <div>
          <i class="el-icon-top" @click="upMove(index)" />
          <i class="el-icon-bottom" @click="downMove(index)" />
        </div>
      </div>
      <div class="action-btn">
        <el-button type="primary" @click="onSave">保存</el-button>
        <el-button @click="onReset">重置</el-button>
      </div>
    </div>
    <i slot="reference" class="el-icon-s-operation sort-icon" />
  </el-popover>
</template>

<script>
import { setStoreData, getStoreData, cloneDeep } from "../../../util/common";

export default {
  name: "CustomerHeader",
  props: {
    columns: {
      type: Array,
      default: () => [],
    },
    url: String,
    fields: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      innerColumns: [],
      visible: false,
    };
  },
  watch: {
    visible: {
      immediate: true,
      handler() {
        const localColumns = getStoreData("_listConfig_")?.[this.url];
        this.innerColumns = localColumns || cloneDeep(this.columns);
      },
    },
  },
  methods: {
    upMove(index) {
      if (index === 0) return;
      this.swapArray(index, index - 1);
    },
    downMove(index) {
      if (index === this.innerColumns.length - 1) return;
      this.swapArray(index, index + 1);
    },
    swapArray(index1, index2) {
      this.innerColumns[index1] = this.innerColumns.splice(
        index2,
        1,
        this.innerColumns[index1]
      )[0];
    },
    onSave() {
      setStoreData("_listConfig_", {
        [this.url]: this.innerColumns,
      });
      this.visible = false;
      this.$emit("on-save");
    },
    onReset() {
      this.removeConfig();
      this.visible = false;
    },
    removeConfig() {
      //重置，移除配置
      let listConfig = getStoreData("_listConfig_");
      if (!listConfig) return;
      delete listConfig[this.url];
      setStoreData("_listConfig_", listConfig);
      this.$emit("on-save");
    },
  },
};
</script>

<style scoped lang="scss">
.sort-icon {
  color: #409eff;
  font-size: 16px;
  cursor: pointer;
}
.item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 200px;
  height: 30px;
  i {
    cursor: pointer;
    font-size: 16px;
  }
  i:last-child {
    margin-left: 5px;
  }
}
.action-btn {
  margin-top: 5px;
}
</style>
