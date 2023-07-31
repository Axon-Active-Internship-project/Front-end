export const isExistItemInArray = (id: number, arr: any[]) => {
  if (arr.length === 0) {
    return false;
  }
  return arr?.some((item: any) => item?.id === id);
};
