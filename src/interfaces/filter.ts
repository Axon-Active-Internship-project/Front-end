export interface FilterProps {
  min?: number;
  max: number;
  priceRange: IPriceRange;
  onHandleChangePriceRange: any;
}

export interface IPriceRange {
  min: string;
  max: string;
}
