import {
  Box,
  Button,
  Flex,
  HStack,
  Input,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { ProductDetailProps } from "../interfaces/product";
import { Slides } from "../components";
import { currencyVND } from "../utils";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";

const ProductDetail = ({
  data,
  onHandleChangequantity,
  quantity,
}: ProductDetailProps) => {
  const {
    name,
    sale_price,
    regular_price,
    images,
    short_description,
    description,
    categories,
    tags,
    stock_status,
    stock_quantity,
  } = data;

  const onHandleIncrementQuantity = () => {
    onHandleChangequantity((quantity: number) => quantity + 1);
  };

  const onHandleReduceQuantity = () => {
    onHandleChangequantity((quantity: number) => {
      if (quantity === 1) {
        return quantity;
      }
      return quantity - 1;
    });
  };

  const onHandleChangeQuantityInput = (
    input: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = input.target;

    if (Number(value)) {
      return onHandleChangequantity(() => Number(value));
    }

    if (Number(value) <= 0) {
      console.log("oc");

      return onHandleChangequantity(() => 1);
    }
    return onHandleChangequantity(() => 1);
  };

  return (
    <Flex flexDirection={"column"} paddingX={"136px"}>
      <Box mb={"50px"}>
        <Flex gap={"28px"} w={"100%"}>
          <Slides images={images} />
          <Flex flexDirection={"column"}>
            <Text
              textTransform={"capitalize"}
              fontSize={"36px"}
              fontWeight={"700"}
            >
              {name}
            </Text>
            <Box mb={"26px"}>
              {!sale_price ? (
                <Text
                  fontSize={24}
                  textTransform={"capitalize"}
                  fontWeight={700}
                  fontStyle={"normal"}
                  isTruncated
                >
                  {currencyVND(regular_price)}
                </Text>
              ) : (
                <HStack spacing={"16px"}>
                  <Text
                    fontSize={24}
                    textTransform={"capitalize"}
                    fontWeight={700}
                    fontStyle={"normal"}
                    isTruncated
                  >
                    {currencyVND(sale_price)}
                  </Text>
                  <Text
                    as="s"
                    fontSize={24}
                    textTransform={"capitalize"}
                    fontWeight={700}
                    fontStyle={"normal"}
                    isTruncated
                  >
                    {currencyVND(regular_price)}
                  </Text>
                </HStack>
              )}
            </Box>
            <Box mb={"48px"}>
              <Text fontSize={20} textTransform={"capitalize"}>
                {short_description ? short_description : description}
              </Text>
            </Box>
            <HStack mb={"24px"}>
              <Text fontSize={20} textTransform={"capitalize"} fontWeight={700}>
                Category:
              </Text>
              {categories?.map((category) => {
                const { id, name } = category;
                return (
                  <Text key={id} fontSize={20}>
                    {name}
                  </Text>
                );
              })}
            </HStack>
            <HStack mb={"24px"}>
              <Text fontSize={20} textTransform={"capitalize"} fontWeight={700}>
                Status:
              </Text>
              <Text fontSize={20}>{stock_status}</Text>
            </HStack>
            <HStack mb={"24px"}>
              <Text fontSize={20} textTransform={"capitalize"} fontWeight={700}>
                Availiable quantity:
              </Text>
              <Text fontSize={20}>
                {stock_quantity ? stock_quantity : "Unlimited"}
              </Text>
            </HStack>
            <HStack mb={"12px"}>
              <Text fontSize={20} textTransform={"capitalize"} fontWeight={700}>
                tags:
              </Text>
              {tags?.map((tag) => {
                const { id, name } = tag;
                return (
                  <Text key={id} fontSize={20}>
                    {name}
                  </Text>
                );
              })}
            </HStack>
            <Flex alignItems={"center"} gap={"30px"} mb={"52px"}>
              <Text fontSize={20} textTransform={"capitalize"} fontWeight={700}>
                Quantity:
              </Text>
              <Flex
                justifyContent={"space-between"}
                alignItems={"center"}
                w={"160px"}
                h={"50px"}
                borderRadius={"15px"}
                borderColor={"black"}
                borderWidth="1px"
                pos={"relative"}
                paddingX={"12px"}
              >
                <MinusIcon
                  w={"20px"}
                  h={"20px"}
                  cursor={"pointer"}
                  onClick={onHandleReduceQuantity}
                />
                <Input
                  border={"none"}
                  paddingY={"2px"}
                  textAlign={"center"}
                  w={"auto"}
                  focusBorderColor={"transparent"}
                  type="number"
                  onChange={onHandleChangeQuantityInput}
                  value={quantity}
                  fontSize={"20px"}
                  min={1}
                />
                <AddIcon
                  w={"20px"}
                  h={"20px"}
                  cursor={"pointer"}
                  onClick={onHandleIncrementQuantity}
                />
              </Flex>
            </Flex>
            <HStack spacing={"30px"}>
              <Button
                fontSize={"26px"}
                backgroundColor={"#000"}
                color={"#FFF"}
                css={`
                  &:hover {
                    color: black;
                    backgroundcolor: white;
                  }
                `}
              >
                Add to cart
              </Button>
              <Button fontSize={"26px"} backgroundColor={"#000"} color={"#FFF"}>
                Buy now
              </Button>
            </HStack>
          </Flex>
        </Flex>
      </Box>
      <Box>
        <Tabs variant="enclosed" color={"black"}>
          <TabList mb={"12px"} gap={"12px"}>
            <Tab fontSize={24} textTransform={"capitalize"} fontWeight={400}>
              Description
            </Tab>
            <Tab fontSize={24} textTransform={"capitalize"} fontWeight={400}>
              Reviews
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel paddingY={0}>
              <Text fontSize={"16px"}>{description}</Text>
            </TabPanel>
            <TabPanel paddingY={0}>
              <p>two!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Flex>
  );
};

export default ProductDetail;