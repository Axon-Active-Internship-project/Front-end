import { useState } from "react";
import { ILocalStorageItem } from "../interfaces";
import { isExistItemInArray } from "../utils";

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

  const setValue = async (newValue: ILocalStorageItem[]) => {
    try {
      window.localStorage.setItem(keyName, JSON.stringify(newValue));
      setStoredValue(() => newValue);

      window.dispatchEvent(
        new CustomEvent("storageEvent", {
          detail: {
            key: "myLocalStorageKey",
            newValue: JSON.stringify(newValue),
          },
        })
      );
    } catch (err) {
      console.log("err => ", err);
    }
  };

  const addToCart = (props: ILocalStorageItem) => {
    try {
      if (!isExistItemInArray(props.id, storedValue)) {
        const item = {
          ...props,
        };
        return setValue([item, ...storedValue]);
      } else {
        return setValue(
          storedValue.map((item: any) => {
            if (item.id === props.id) {
              const newQuantity = (item.quantity += props.quantity);
              return { ...item, quantity: newQuantity };
            }
            return item;
          })
        );
      }
    } catch (err) {
      console.log("err => ", err);
    }
  };

  return { value: storedValue, updateValue: setValue, addToCart };
};

export default useLocalStorage;
