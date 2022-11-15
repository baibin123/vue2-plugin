Array.prototype.$get = function (key) {
  return this.find((item) => item.prop === key);
};
