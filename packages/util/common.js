const clearStoreData = function () {
  window.localStorage.clear();
};

const setStoreData = function (key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(e);
  }
};

const getStoreData = function (key) {
  try {
    let storeStr = window.localStorage.getItem(key);
    if (storeStr) {
      return JSON.parse(storeStr);
    } else {
      return null;
    }
  } catch (e) {
    console.error(e);
  }
};

const removeStoreData = function (key) {
  window.localStorage.removeItem(key);
};

export default {
  clearStoreData,
  setStoreData,
  getStoreData,
  removeStoreData,
};
