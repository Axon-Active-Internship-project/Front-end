import { IPriceRange } from ".";

interface IProduct {
  id: number;
  name: string;
  description?: string;
  short_description?: string;
  regular_price: string;
  sale_price?: string;
  tags: ITag[];
  categories: ICategory[];
  images: IImageProduct[];
  stock_status?: string;
  stock_quantity?: number;
}

export interface IImageProduct {
  id: number;
  src: string;
  alt?: string;
  name?: string;
}

export interface ICategory {
  id: number;
  name: string;
}

interface ITag {
  id: string;
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
  priceRange: IPriceRange;
  searchKey: string;
  onHandleChangePagination: any;
  onHandleChangeInput: any;
  isErrorInput: boolean;
  errorInputMessage: string;
  onHandleAddToCart: any;
  onHandleBuyNow: any;
  onHandlePressEnter: any;
}

type onHandleChangePriceRange = ({
  min,
  max,
}: {
  min?: string;
  max: string;
}) => void;
export interface CardProps {
  data: IProduct;
  handleAddToCart: any;
  handleBuyNow: any;
}

export interface ProductDetailProps {
  data: IProduct;
  quantity: number;
  onHandleChangequantity: any;
  onHandleAddToCart: any;
  onHandleBuyNow: any;
}

export default IProduct;
