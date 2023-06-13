import { IProduct } from "../interfaces";
import { Product } from "../pages";
const data: Array<IProduct> = [];
const ProductContainer = () => {
  return <Product data={data} />;
};

export default ProductContainer;
