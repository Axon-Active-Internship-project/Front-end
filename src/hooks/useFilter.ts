import { useCallback, useState } from "react";
const useFilter = (arr: any) => {
  const [list, setList] = useState<Array<any>>(arr);
  const [listFilter, setListFilter] = useState<Array<any>>([]);

  const handleFilter = useCallback((min: number, max: number) => {
    setListFilter(() => {
      return list.filter((item) => {
        return Number(item.price) >= min && Number(item.price) <= max;
      });
    });
  }, []);

  return {
    listFilter,
    handleFilter,
  };
};

export default useFilter;
