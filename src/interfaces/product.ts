interface IProduct {
  id: number;
  name: string;
  description?: string;
  regular_price: string;
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
}

export interface CardProps {
  data: IProduct;
}

export default IProduct;
