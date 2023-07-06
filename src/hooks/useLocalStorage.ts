import { useState } from "react";
import { ILocalStorageItem } from "../interfaces";

const useLocalStorage = (
  keyName: string,
  defaultValue?: ILocalStorageItem[] | []
) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = window.localStorage.getItem(keyName);

      if (value) {
        return JSON.parse(value);
      } else {
        window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (err) {
      return defaultValue;
    }
  });

  const setValue = (newValue: ILocalStorageItem[]) => {
    try {
      window.localStorage.setItem(keyName, JSON.stringify(newValue));
    } catch (err) {
      console.log("err => ", err);
    }
    setStoredValue(newValue);
  };

  return [storedValue, setValue];
};

export default useLocalStorage;
