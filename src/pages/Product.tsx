import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
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
import { ProductProps } from "../interfaces";
import { Filter, Card, Pagination } from "../components";
import { SearchIcon } from "@chakra-ui/icons";
import { useMemo } from "react";
import { categories } from "../utils/FakeAPI";

const Product = ({
  data,
  totalPages,
  onHandleChangePagination,
  currentPage,
  onHandleChangeInput,
  searchKey,
  isErrorInput,
  errorInputMessage,
}: ProductProps) => {
  const MAX = useMemo(
    () => Math.max(...data.map((o) => Number(o.price))),
    [data]
  );
  const MIN = useMemo(
    () => Math.min(...data.map((o) => Number(o.price))),
    [data]
  );

  return (
    <Flex flexDirection={"column"} gap={12}>
      <Flex flexDirection={"column"} alignItems={"center"} gap={2}>
        <Heading as={"h2"} fontSize={30} fontWeight={700} fontFamily={"lekton"}>
          Local specialty’s areas
        </Heading>
        <Heading as={"h3"} fontSize={22} fontWeight={700}>
          The best offer that we offer to the world
        </Heading>
      </Flex>

      <Flex justifyContent={"center"} alignItems={"center"} pos={"relative"}>
        <Flex justifyContent={"center"} gap={100}>
          {categories.map((item) => {
            const { id, name } = item;
            return (
              <Text
                key={id}
                fontSize={18}
                fontWeight={400}
                fontFamily={"lekton"}
              >
                {name}
              </Text>
            );
          })}
        </Flex>
        <Box pos={"absolute"} right={0}>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="black.300" />
            </InputLeftElement>
            <Input
              type="text"
              placeholder="Search"
              defaultValue={searchKey}
              onChange={(e) => onHandleChangeInput(e)}
              isInvalid={isErrorInput}
              errorBorderColor={isErrorInput ? "crimson" : ""}
            />
          </InputGroup>
        </Box>
        {isErrorInput && (
          <Alert status="error" pos={"absolute"} right={0} top={0} w={"50%"}>
            <AlertIcon />
            <AlertTitle>Error input</AlertTitle>
            <AlertDescription>{errorInputMessage}</AlertDescription>
          </Alert>
        )}
      </Flex>
      <Grid gap={12} templateColumns={"repeat(4, 1fr)"}>
        <GridItem>
          <Filter minValue={MIN} maxValue={MAX} />
        </GridItem>
        <GridItem colStart={2} colSpan={3}>
          {data.length > 0 ? (
            <>
              <Grid templateColumns={"repeat(3, 1fr)"} gap={"30px"}>
                {data?.map((item) => (
                  <Card data={item} key={item.id} />
                ))}
              </Grid>
              <Pagination
                onPageChange={onHandleChangePagination}
                currentPage={currentPage}
                totalPageCount={totalPages}
              />
            </>
          ) : (
            <Flex justifyContent={"flex-start"} alignItems={"center"}>
              <Text fontSize={24} fontWeight={700}>
                No product matching with keyword: {searchKey}
              </Text>
            </Flex>
          )}
        </GridItem>
      </Grid>
    </Flex>
  );
};

export default Product;
