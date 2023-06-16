import { IProduct } from "../interfaces";
import { Product } from "../pages";

const data1: Array<IProduct> = [
  {
    id: 1,
    name: "nem cha",
    price: "10",
    sale_price: "9999",
    src: "https://s1.storage.5giay.vn/image/2016/10/20161021_b84b6337cc54488264598cf7e498eeff_1477033027.jpg",
  },
  {
    id: 2,
    name: "ca cua",
    price: "20",
    src: "https://s1.storage.5giay.vn/image/2016/10/20161021_b84b6337cc54488264598cf7e498eeff_1477033027.jpg",
  },
  {
    id: 3,
    name: "ga",
    price: "10000",
    sale_price: "9999",
    src: "https://toplist.vn/images/800px/bai-van-thuyet-minh-ve-con-ga-hay-nhat-so-1-991361.jpg",
  },
  {
    id: 4,
    name: "heo",
    price: "10000",
    src: "https://s1.storage.5giay.vn/image/2016/10/20161021_b84b6337cc54488264598cf7e498eeff_1477033027.jpg",
  },
  {
    id: 5,
    name: "vit",
    price: "10000",
    sale_price: "9999",
    src: "https://s1.storage.5giay.vn/image/2016/10/20161021_b84b6337cc54488264598cf7e498eeff_1477033027.jpg",
  },
];
const ProductContainer = () => {
  // const queryClient = useQueryClient();
  // const { data, isLoading, isError, error } = useQuery({
  //   queryKey: ["products"],
  //   queryFn: product.getProduct,
  // });

  // console.log(data, isError, isLoading, error);

  return <Product data={data1} />;
};

export default ProductContainer;
