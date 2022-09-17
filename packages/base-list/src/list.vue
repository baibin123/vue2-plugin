<template>
  <div>
    <base-form
      query
      :fields="fields"
      v-bind="getFormConfig().attrs"
      v-on="getFormConfig().listeners"
    >
      <template #[slotName] v-for="(_, slotName) in conditionSlots">
        <slot :name="slotName" />
      </template>
    </base-form>
    <base-table
      :fields="fields"
      v-bind="getTableConfig().attrs"
      v-on="getTableConfig().listeners"
    >
      <template #[slotName] v-for="(_, slotName) in tableSlots">
        <slot :name="slotName" />
      </template>
    </base-table>
    <base-pagination />
  </div>
</template>

<script>
export default {
  name: "BaseList",
  props: {
    fields: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    conditionSlots() {
      return this.$slots?.condition || {};
    },
    tableSlots() {
      return this.$slots?.table || {};
    },
  },
  methods: {
    getFormConfig() {
      const attrs = ["form-data", "model", "rules", "form-span", "size"];
      const listeners = [];
      return {
        attrs: this.transferAttr(attrs),
        listeners: this.transferListeners(listeners),
      };
    },
    getTableConfig() {
      const attrs = ["table-data", "columns", "size"];
      const listeners = ["onDetail", "onEdit", "onRemove"];
      return {
        attrs: this.transferAttr(attrs),
        listeners: this.transferListeners(listeners),
      };
    },
    transferAttr(attrs) {
      return attrs.reduce(
        (obj, key) => ({ ...obj, [key]: this.$attrs[key] }),
        {}
      );
    },
    transferListeners(attrs) {
      return attrs.reduce(
        (obj, key) => ({ ...obj, [key]: this.$listeners[key] }),
        {}
      );
    },
  },
};
</script>

<style scoped></style>
