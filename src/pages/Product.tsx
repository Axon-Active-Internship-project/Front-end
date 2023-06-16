import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from "@chakra-ui/react";
import { ICategory, ProductProps } from "../interfaces";
import { Filter, Card } from "../components";
import { useFilter } from "../hooks";
import { SearchIcon } from "@chakra-ui/icons";
import { useState } from "react";

const categories: ICategory[] = [
  { id: 1, name: "Vegetables" },
  { id: 1, name: "Dairy Products" },
  { id: 1, name: "Pickled Products" },
  { id: 1, name: "Dried Products" },
];

const Product = ({ data }: ProductProps) => {
  const { listFilter, handleFilter } = useFilter(data);
  const [inputValue, setInputValue] = useState<String>("");

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(() => {
      return e.target.value;
    });
  };

  const MAX = Math.max(...data.map((o) => Number(o.price)));
  const MIN = Math.min(...data.map((o) => Number(o.price)));

  return (
    <Flex flexDirection={"column"} gap={12}>
      <Flex flexDirection={"column"} alignItems={"center"} gap={5}>
        <Heading as={"h2"} fontSize={30}>
          Local specialty’s areas
        </Heading>
        <Heading as={"h3"} fontSize={22}>
          The best offer that we offer to the world
        </Heading>
      </Flex>

      <Flex justifyContent={"center"} alignItems={"center"} pos={"relative"}>
        <Flex justifyContent={"center"} gap={100}>
          {categories.map((item) => {
            const { id, name } = item;
            return (
              <Text key={id} fontSize={16}>
                {name}
              </Text>
            );
          })}
        </Flex>
        <Box pos={"absolute"} right={53}>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="black.300" />
            </InputLeftElement>
            <Input
              type="text"
              placeholder="Search"
              onChange={(e) => handleChangeInput(e)}
            />
          </InputGroup>
        </Box>
      </Flex>
      <Grid gap={12} templateColumns={"repeat(4, 1fr)"}>
        <GridItem>
          <Filter minValue={MIN} maxValue={MAX} onHandleFilter={handleFilter} />
        </GridItem>
        <GridItem colStart={2} colSpan={3}>
          <Grid templateColumns={"repeat(3, 1fr)"} gap={"30px"}>
            {data.map((item) => (
              <Card data={item} key={item.id} />
            ))}
          </Grid>
        </GridItem>
      </Grid>
    </Flex>
  );
};

export default Product;
