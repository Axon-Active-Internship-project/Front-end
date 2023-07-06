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
import { addToCart, currencyVND } from "../utils";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import parse from "html-react-parser";
import { useState, useRef, useEffect } from "react";

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

  const [lines, setLines] = useState<number>(0);
  const [isShowReadMore, setIsShowReadMore] = useState<boolean>(false);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const divHeight = descriptionRef.current?.offsetHeight;

    let lineHeight = 0;

    if (descriptionRef.current) {
      lineHeight = parseInt(
        window
          .getComputedStyle(descriptionRef.current, null)
          .getPropertyValue("line-height")
      );
    }

    setLines(() => divHeight / lineHeight);
  }, []);

  const toggleReadMore = () => {
    setIsShowReadMore(!isShowReadMore);
  };

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

    if (Math.abs(Number(value)) <= 0) {
      return onHandleChangequantity(() => 1);
    }
    return onHandleChangequantity(() => 1);
  };

  const preventMinus = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "-" || e.key === "+") {
      e.preventDefault();
    }
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
            {!!short_description || !!description ? (
              <Box mb={"48px"} pos={"relative"}>
                <Text
                  fontSize={20}
                  textTransform={"capitalize"}
                  noOfLines={isShowReadMore ? undefined : 3}
                  lineHeight={"30px"}
                  ref={descriptionRef}
                >
                  {short_description
                    ? parse(short_description)
                    : parse(description || "")}
                </Text>
                {lines < 3 ? null : (
                  <Box
                    onClick={toggleReadMore}
                    pos={"absolute"}
                    right={0}
                    bottom={-5}
                    cursor={"pointer"}
                  >
                    <Text>{isShowReadMore ? "Show less" : "Show more"}</Text>
                  </Box>
                )}
              </Box>
            ) : null}
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
                  onKeyDown={preventMinus}
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
                onClick={() =>
                  addToCart({
                    ...data,
                    image: images?.[0].src || "",
                    quantity,
                  })
                }
              >
                Add to cart
              </Button>
              <Button
                fontSize={"26px"}
                backgroundColor={"#000"}
                color={"#FFF"}
                css={`
                  &:hover {
                    color: black;
                    backgroundcolor: red;
                  }
                `}
              >
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
              <Text fontSize={"16px"}>{parse(description || "")}</Text>
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
