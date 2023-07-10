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
  Select,
} from "@chakra-ui/react";
import { ProductProps } from "../interfaces";
import { Filter, Card, Pagination } from "../components";
import { SearchIcon } from "@chakra-ui/icons";

const Product = ({
  data,
  totalPages,
  currentPage,
  onHandleChangeCategory,
  categories,
  onHandleChangePriceRange,
  priceSelect,
  onHandleChangeInput,
  searchKey,
  isErrorInput,
  errorInputMessage,
  onHandleChangePagination,
  onHandleAddToCart,
  onHandleBuyNow,
  onHandlePressEnter,
}: ProductProps) => {
  return (
    <Flex flexDirection={"column"} gap={12}>
      <Flex flexDirection={"column"} alignItems={"center"} gap={2}>
        <Heading as={"h2"} fontSize={30} fontWeight={700} fontFamily={"lekton"}>
          Local specialty's areas
        </Heading>
        <Heading as={"h3"} fontSize={22} fontWeight={700}>
          The best offer that we offer to the world
        </Heading>
      </Flex>

      <Flex
        justifyContent={"flex-end"}
        flexDirection={"column"}
        alignItems={"flex-end"}
        pos={"relative"}
      >
        <InputGroup maxW={"250px"}>
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="black.300" />
          </InputLeftElement>
          <Input
            type="search"
            placeholder="Search"
            defaultValue={searchKey}
            onChange={(e) => onHandleChangeInput(e)}
            isInvalid={isErrorInput}
            errorBorderColor={isErrorInput ? "crimson" : ""}
            onKeyDown={(e) => onHandlePressEnter(e)}
          />
        </InputGroup>
        {isErrorInput && (
          <Text
            pos={"absolute"}
            bottom={-12}
            maxW={"250px"}
            pt={"4px"}
            fontSize={14}
            fontWeight={300}
            color={"red"}
          >
            {errorInputMessage}
          </Text>
        )}
      </Flex>
      <Grid gap={12} templateColumns={"repeat(4, 1fr)"}>
        <GridItem>
          <Heading as={"h3"} fontSize={26} mb={"24px"}>
            Filter
          </Heading>

          <Box paddingLeft={"12px"} mb={"24px"}>
            <Heading
              as={"h3"}
              fontSize={22}
              mb={"24px"}
              textTransform={"capitalize"}
            >
              by price
            </Heading>
            <Filter
              onHandleChangePriceRange={onHandleChangePriceRange}
              priceSelect={priceSelect}
            />
          </Box>
          <Box paddingLeft={"12px"}>
            {" "}
            <Heading
              as={"h3"}
              fontSize={22}
              mb={"24px"}
              textTransform={"capitalize"}
            >
              by category
            </Heading>
            <Select
              onChange={(e) => onHandleChangeCategory(String(e.target.value))}
              fontSize={18}
              fontWeight={400}
              textTransform={"capitalize"}
            >
              <option value={""}>all</option>
              {categories.map((item) => {
                const { id, name } = item;

                if (name === "Uncategorized") {
                  return;
                }
                return (
                  <option key={id} value={id}>
                    {name}
                  </option>
                );
              })}
            </Select>
          </Box>
        </GridItem>
        <GridItem colStart={2} colSpan={3}>
          {data.length > 0 ? (
            <>
              <Grid templateColumns={"repeat(3, 1fr)"} gap={"30px"}>
                {data?.map((item) => (
                  <Card
                    data={item}
                    key={item.id}
                    handleAddToCart={onHandleAddToCart}
                    handleBuyNow={onHandleBuyNow}
                  />
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
                There is no result found
                {searchKey && ` with keyword: ${searchKey}`}
              </Text>
            </Flex>
          )}
        </GridItem>
      </Grid>
    </Flex>
  );
};

export default Product;
