<template>
  <el-popover v-model="visible" placement="right" trigger="click">
    <div class="header-config-container">
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
import { setStoreData, getStoreData } from "../../../util/common";

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
      transferColumns: [],
    };
  },
  watch: {
    visible: {
      immediate: true,
      handler(nv) {
        if (nv) {
          const localColumns = getStoreData("_listConfig_")?.[this.url];
          if (localColumns?.length > 0) {
            this.innerColumns = localColumns
              .map((col) => {
                const item = this.transferColumns.find(
                  (sub) => sub.prop === col.prop
                );
                return { ...item, checked: col.checked };
              })
              .filter((item) => item.label);
          } else {
            this.innerColumns = this.transferColumns
              .map((item) => ({ ...item, checked: true }))
              .filter((item) => item.label);
          }
        }
      },
    },
    columns: {
      handler(nv) {
        this.transferColumns = [];
        nv?.forEach((item) => {
          if (typeof item === "string") {
            this.transferColumns.push({ prop: item, label: this.fields[item] });
          } else if (Object.keys(item).length === 1) {
            const [prop] = Object.keys(item);
            this.transferColumns.push({ prop, label: this.fields[prop] });
          } else {
            this.transferColumns.push({ prop: item.prop, label: item.label });
          }
        });
      },
      immediate: true,
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
      if (this.innerColumns.filter(({ checked }) => checked).length < 3) {
        return this.$message.warning("请至少选择3列展示");
      }
      setStoreData("_listConfig_", {
        ...getStoreData("_listConfig_"),
        ...{
          [this.url]: this.innerColumns.map(({ prop, checked }) => ({
            prop,
            checked,
          })),
        },
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
.header-config-container {
  max-height: 700px;
  overflow-y: auto;
}
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
