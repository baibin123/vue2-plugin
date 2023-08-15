Array.prototype.$get = function () {
  if (arguments?.length === 1) {
    return this.find((item) => item.prop === arguments[0]);
  } else {
    return this.filter((item) => [...arguments].includes(item.prop));
  }
};
