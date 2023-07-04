const Storage = {
  /**
   * Get data from sessionStorage
   * @param key
   */

  getItem: (key) => {
    return sessionStorage.getItem(key);
  },

  /**
   * Set data to localstorage
   * @param key
   * @param value
   */
  setItem(key, value) {
    sessionStorage.setItem(key, value);
  },

  clearItem() {
    sessionStorage.clear();
  },
};

export default Storage;
