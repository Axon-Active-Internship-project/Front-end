export const currencyVND = (currnecy: string): string => {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "VND",
  }).format(Number(currnecy));
};
