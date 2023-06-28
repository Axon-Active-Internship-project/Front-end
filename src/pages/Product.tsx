import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  Text,
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
  categoriId,
  onHandleChangePriceRange,
  priceSelect,
  onHandleChangeInput,
  searchKey,
  isErrorInput,
  errorInputMessage,
  onHandleChangePagination,
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

      <Flex justifyContent={"center"} alignItems={"center"} pos={"relative"}>
        <Flex justifyContent={"center"} gap={100}>
          <Button
            fontSize={18}
            fontWeight={!categoriId ? 700 : 400}
            variant={"unstyled"}
            textTransform={"capitalize"}
            onClick={() => onHandleChangeCategory("")}
          >
            all
          </Button>
          {categories.map((item) => {
            const { id, name } = item;
            return (
              <Button
                key={id}
                fontSize={18}
                fontWeight={categoriId === String(id) ? 700 : 400}
                textTransform={"capitalize"}
                variant={"unstyled"}
                onClick={() => onHandleChangeCategory(String(id))}
              >
                {name}
              </Button>
            );
          })}
        </Flex>
        <Box pos={"absolute"} right={0}>
          <InputGroup>
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
            />
          </InputGroup>
          {isErrorInput && (
            <Text
              maxW={"250px"}
              pt={"4px"}
              fontSize={14}
              fontWeight={300}
              color={"red"}
            >
              {errorInputMessage}
            </Text>
          )}
        </Box>
      </Flex>
      <Grid gap={12} templateColumns={"repeat(4, 1fr)"}>
        <GridItem>
          <Filter
            onHandleChangePriceRange={onHandleChangePriceRange}
            priceSelect={priceSelect}
          />
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
                There is no result found
                {searchKey ? ` with keyword: ${searchKey}` : ""}
              </Text>
            </Flex>
          )}
        </GridItem>
      </Grid>
    </Flex>
  );
};

export default Product;
