interface IProduct {
  id: number;
  name: string;
  description?: string;
  price: string;
  sale_price?: string;
  categories?: [ICategory];
  images: [IImageProduct];
}

interface IImageProduct {
  id: number;
  src: string;
  alt?: string;
  name?: string;
}

export interface ICategory {
  id: number;
  name: string;
}

export interface ProductProps {
  data: IProduct[];
  currentPage: number;
  totalPages: number;
  onHandleChangeCategory: any;
  categories: ICategory[];
  categoriId: string;
  onHandleChangePriceRange: onHandleChangePriceRange;
  priceSelect: string;
  searchKey: string;
  onHandleChangePagination: any;
  onHandleChangeInput: any;
  isErrorInput: boolean;
  errorInputMessage: string;
}

type onHandleChangePriceRange = (id: string) => void;
export interface CardProps {
  data: IProduct;
}

export default IProduct;
