import { Grid, GridItem } from "@chakra-ui/react";
import { ProductProps } from "../interfaces";
import { Filter, Card } from "../components";

const Product = ({ data }: ProductProps) => {
  console.log(data);
  return (
    <Grid gap={12} templateColumns={"repeat(4, 1fr)"}>
      <GridItem>
        <Filter></Filter>
      </GridItem>
      <GridItem colStart={2} colSpan={3}>
        <Grid templateColumns={"repeat(3, 1fr)"} gap={"30px"}>
          {data.map((item) => (
            <Card data={item} key={item.id} />
          ))}
        </Grid>
      </GridItem>
    </Grid>
  );
};

export default Product;
