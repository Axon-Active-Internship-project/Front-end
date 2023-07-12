const Storage = {
  /**
   * Get data from sessionStorage
   * @param key
   */

  getItem: (key: string) => {
    return localStorage.getItem(key);
  },

  /**
   * Set data to localstorage
   * @param key
   * @param value
   */
  setItem: (key: string, value: any) => {
    localStorage.setItem(key, value);
  },

  clearItem: (key: string) => {
    localStorage.removeItem(key);
  },
};

export default Storage;
