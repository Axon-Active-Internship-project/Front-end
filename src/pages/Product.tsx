import { Grid } from "@chakra-ui/react";
import { IProduct } from "../interfaces";
import { Filter, Card } from "../components";

interface ProductProps {
  data: IProduct[];
}
const Product = ({ data }: ProductProps) => {
  console.log(data);
  return (
    <Grid>
      <Filter></Filter>
      <Card name="asd" price="1000" id={1} sale_price="900" />
    </Grid>
  );
};

export default Product;
