import { Product } from "../pages";
import { products } from "../utils/FakeAPI";

const ProductContainer = () => {
  // const queryClient = useQueryClient();
  // const { data, isLoading, isError, error } = useQuery({
  //   queryKey: ["products"],
  //   queryFn: product.getProduct,
  // });

  // console.log(data, isError, isLoading, error);

  return <Product data={products} />;
};

export default ProductContainer;
