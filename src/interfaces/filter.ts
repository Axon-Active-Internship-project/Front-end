export interface FilterProps {
  maxValue: number;
  minValue: number;
  step?: number;
  onHandleFilter: filterFunc;
}

interface filterFunc {
  (min: number, max: number): any;
}
1;
