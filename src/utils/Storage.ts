const Storage = {
  /**
   * Get data from sessionStorage
   * @param key
   */

  getItem: (key: string) => {
    return sessionStorage.getItem(key);
  },

  /**
   * Set data to localstorage
   * @param key
   * @param value
   */
  setItem: (key: string, value: any) => {
    sessionStorage.setItem(key, value);
  },

  clearItem: (key: string) => {
    sessionStorage.removeItem(key);
  },
};

export default Storage;
