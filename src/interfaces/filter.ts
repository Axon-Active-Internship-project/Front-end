export interface FilterProps {
  onHandleChangeFilter: IOnHandleChangeFilter;
  filterRange: { min: string; max: string };
}

type IOnHandleChangeFilter = ({
  min,
  max,
}: {
  min: string;
  max: string;
}) => any;
