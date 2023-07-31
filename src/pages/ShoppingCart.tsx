import {
  Box,
  Button,
  CloseButton,
  Flex,
  HStack,
  Heading,
  Image,
  Input,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon, MinusIcon } from "@chakra-ui/icons";
import { TABLE_HEADER, currencyVND, isExistItemInArray } from "../utils";
import { ShoppingCartProps } from "../interfaces";
import { useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";

const ShoppingCart = ({
  data,
  couponData,
  errorCoupon,
  couponInput,
  isLoadingCoupon,
  onDelete,
  onHandleChangeQuantity,
  onHandleChangeCoupon,
  onHandleApplyCoupon,
  onHandleRemoveCoupon,
  onFocusInputCoupon,
  onCleanCart,
}: ShoppingCartProps) => {
  const subTotal = useMemo(() => {
    return data.reduce((total, currentValue) => {
      const price =
        Number(currentValue.sale_price || currentValue.regular_price) *
        currentValue.quantity;
      return (total += price);
    }, 0);
  }, [data]);

  const total = useMemo(() => {
    if (couponData) {
      return subTotal - Number(couponData.amount);
    }
    return subTotal;
  }, [couponData, data]);

  const navigate = useNavigate();

  const onHandleIncrementQuantity = (id: number) => {
    if (!isExistItemInArray(id, data)) {
      return;
    }

    return onHandleChangeQuantity(
      data.map((item) => {
        if (item.id === id) {
          const newQuantity = item.quantity + 1;
          if (
            item.quantity >= Number(item.stock_quantity) &&
            item?.stock_quantity
          ) {
            return { ...item };
          }

          return { ...item, quantity: newQuantity };
        }

        return item;
      })
    );
  };

  const onHandleReduceQuantity = (id: number) => {
    if (!isExistItemInArray(id, data)) {
      return;
    }

    return onHandleChangeQuantity(
      data.map((item) => {
        if (item.id === id) {
          const newQuantity = item.quantity - 1;
          if (item.quantity <= 1) {
            return { ...item };
          }

          return { ...item, quantity: newQuantity };
        }

        return item;
      })
    );
  };

  const onHandleChangeQuantityInput = (
    id: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!isExistItemInArray(id, data)) {
      return;
    }
    return onHandleChangeQuantity(
      data.map((item) => {
        if (item.id === id) {
          if (Number(e.target.value) <= 0) {
            return { ...item, quantity: 1 };
          }

          if (
            Number(e.target.value) > Number(item.stock_quantity) &&
            item?.stock_quantity
          ) {
            return { ...item, quantity: item?.stock_quantity };
          }
          return { ...item, quantity: Number(e.target.value) };
        }
        return item;
      })
    );
  };

  const preventMinus = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "-" || e.key === "+" || e.key === ".") {
      e.preventDefault();
    }
  };

  const onHandleBackShop = () => {
    navigate("../products");
  };

  const onHandleCheckout = () => {
    navigate("../checkout", {
      state: {
        data,
        subTotal,
        coupon: couponData,
        total,
      },
    });
  };

  return (
    <Box minH={"650px"}>
      {data.length === 0 ? (
        <Flex
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Heading mb={"48px"}>There are no items in this cart</Heading>
          <Button onClick={onHandleBackShop}>Back to shop</Button>
        </Flex>
      ) : (
        <Flex paddingX={"136px"} flexDirection={"column"}>
          <Flex
            justifyContent={"space-between"}
            alignItems={"center"}
            mb={"48px"}
          >
            <Heading>Shopping cart</Heading>
            <Button
              variant={"outline"}
              minW={"130px"}
              minH={"40px"}
              fontSize={24}
              fontWeight={600}
              textTransform={"capitalize"}
              borderColor={"black"}
              onClick={onCleanCart}
            >
              Clean Cart
            </Button>
          </Flex>
          <TableContainer mb={"32px"}>
            <Table variant={"simple"}>
              <Thead>
                <Tr>
                  {TABLE_HEADER.map((item, index) => (
                    <Th
                      key={index}
                      textAlign={"center"}
                      color={"black"}
                      fontSize={"20px"}
                      fontWeight={700}
                      borderColor={"#c7c7c7"}
                    >
                      {item}
                    </Th>
                  ))}
                </Tr>
              </Thead>
              <Tbody>
                {data?.map((item) => {
                  const {
                    id,
                    image,
                    name,
                    regular_price,
                    sale_price,
                    quantity,
                    stock_quantity,
                  } = item;
                  const totalPrice =
                    quantity * Number(sale_price || regular_price);

                  return (
                    <Tr
                      key={id}
                      color={"black"}
                      fontSize={"20px"}
                      fontWeight={400}
                      textTransform={"capitalize"}
                    >
                      <Td
                        borderBottom={"1px"}
                        color={"black"}
                        borderColor={"#e2e8f0"}
                      >
                        <Link to={`/product/${id}`}>
                          <Image
                            src={image}
                            w={"200px"}
                            h={"200px"}
                            minW={"200px"}
                            minH={"200px"}
                            objectFit={"cover"}
                          />
                        </Link>
                      </Td>
                      <Td
                        borderBottom={"1px"}
                        borderColor={"#e2e8f0"}
                        textAlign={"center"}
                        whiteSpace={"break-spaces"}
                      >
                        <Link to={`/product/${id}`}>{name}</Link>
                      </Td>
                      <Td
                        borderBottom={"1px"}
                        borderColor={"#e2e8f0"}
                        color={"black"}
                        textAlign={"center"}
                        whiteSpace={"break-spaces"}
                      >
                        {currencyVND(sale_price || regular_price || "0")}
                      </Td>
                      <Td
                        borderBottom={"1px"}
                        borderColor={"#e2e8f0"}
                        color={"black"}
                        textAlign={"center"}
                      >
                        <Flex
                          justifyContent={"space-between"}
                          alignItems={"center"}
                          w={"140px"}
                          h={"50px"}
                          borderRadius={"15px"}
                          borderColor={"black"}
                          borderWidth="1px"
                          paddingX={"12px"}
                          m={0}
                        >
                          <MinusIcon
                            w={"20px"}
                            h={"20px"}
                            cursor={"pointer"}
                            onClick={() => onHandleReduceQuantity(id)}
                            opacity={quantity !== 1 && quantity > 1 ? 1 : 0.3}
                          />
                          <Input
                            border={"none"}
                            paddingY={"2px"}
                            textAlign={"center"}
                            w={"auto"}
                            focusBorderColor={"transparent"}
                            type="number"
                            fontSize={"20px"}
                            min={1}
                            value={quantity}
                            onChange={(e) => onHandleChangeQuantityInput(id, e)}
                            onKeyDown={preventMinus}
                          />
                          <AddIcon
                            w={"20px"}
                            h={"20px"}
                            cursor={"pointer"}
                            onClick={() => onHandleIncrementQuantity(id)}
                            opacity={
                              quantity === Number(stock_quantity) ? 0.3 : 1
                            }
                          />
                        </Flex>
                      </Td>
                      <Td
                        borderBottom={"1px"}
                        borderColor={"#e2e8f0"}
                        color={"black"}
                        textAlign={"center"}
                        whiteSpace={"break-spaces"}
                        wordBreak={"break-all"}
                        minW={"155px"}
                      >
                        {currencyVND(String(totalPrice))}
                      </Td>
                      <Td
                        borderBottom={"1px"}
                        borderColor={"#e2e8f0"}
                        color={"black"}
                        textAlign={"center"}
                      >
                        <Button
                          onClick={() => onDelete(id)}
                          variant={"outline"}
                          borderColor={"black"}
                        >
                          <DeleteIcon />
                        </Button>
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
          <Box>
            <Flex flexDirection={"row"} justifyContent={"space-between"}>
              <Box>
                <HStack>
                  <Input
                    type="text"
                    maxW={"160px"}
                    onChange={(e) => onHandleChangeCoupon(e)}
                    value={couponInput}
                    onFocus={onFocusInputCoupon}
                    isInvalid={errorCoupon.isError}
                    fontSize={20}
                    borderColor={"black"}
                    placeholder="Your voucher"
                  />

                  <Button
                    onClick={onHandleApplyCoupon}
                    minW={"130px"}
                    minH={"40px"}
                    fontSize={24}
                    fontWeight={600}
                    textTransform={"capitalize"}
                    backgroundColor={"black"}
                    color={"white"}
                    isLoading={isLoadingCoupon}
                  >
                    apply
                  </Button>
                </HStack>
                <Text
                  maxW={"250px"}
                  pt={"4px"}
                  fontSize={14}
                  fontWeight={300}
                  color={"red"}
                >
                  {errorCoupon.message}
                </Text>
              </Box>
              <Box
                borderWidth={"1px"}
                borderColor={"black"}
                borderRadius={"5px"}
                minW={"480px"}
              >
                <Flex flexDirection={"column"} w={"100%"} padding={"12px"}>
                  <HStack
                    w={"100%"}
                    justifyContent={"space-between"}
                    mb={"12px"}
                  >
                    <Text
                      w={"190px"}
                      fontSize={"24px"}
                      fontWeight={"400"}
                      textTransform={"capitalize"}
                    >
                      Sub total:
                    </Text>
                    <Text
                      w={"190px"}
                      fontSize={"24px"}
                      fontWeight={"700"}
                      textTransform={"capitalize"}
                    >
                      {currencyVND(String(subTotal))}
                    </Text>
                  </HStack>
                  <HStack
                    w={"100%"}
                    justifyContent={"space-between"}
                    mb={"12px"}
                  >
                    <Text
                      w={"190px"}
                      fontSize={"24px"}
                      fontWeight={"400"}
                      textTransform={"capitalize"}
                    >
                      Tax:
                    </Text>
                    <Text
                      w={"190px"}
                      fontSize={"24px"}
                      fontWeight={"700"}
                      textTransform={"capitalize"}
                    >
                      {currencyVND(String(0))}
                    </Text>
                  </HStack>
                  {couponData && (
                    <HStack
                      w={"100%"}
                      justifyContent={"space-between"}
                      mb={"12px"}
                    >
                      <Text w={"190px"} fontSize={"24px"} fontWeight={"400"}>
                        Coupon: {couponData.code}
                      </Text>
                      <HStack spacing={0} w={"190px"}>
                        <Text
                          w={"100%"}
                          fontSize={"24px"}
                          fontWeight={"700"}
                          textTransform={"capitalize"}
                        >
                          - {currencyVND(String(couponData?.amount))}
                        </Text>
                        <CloseButton size="sm" onClick={onHandleRemoveCoupon} />
                      </HStack>
                    </HStack>
                  )}
                  <HStack
                    w={"100%"}
                    justifyContent={"space-between"}
                    mb={"36px"}
                  >
                    <Text
                      w={"190px"}
                      fontSize={"24px"}
                      fontWeight={"400"}
                      textTransform={"capitalize"}
                    >
                      Total:
                    </Text>
                    <Text
                      w={"190px"}
                      fontSize={"24px"}
                      fontWeight={"700"}
                      textTransform={"capitalize"}
                    >
                      {currencyVND(String(total))}
                    </Text>
                  </HStack>
                  <Button
                    minW={"130px"}
                    minH={"40px"}
                    fontSize={24}
                    fontWeight={600}
                    textTransform={"capitalize"}
                    color={"red"}
                    borderColor={"red"}
                    variant={"outline"}
                    onClick={onHandleCheckout}
                    css={`
                      &:hover {
                        color: white;
                        background-color: red;
                      }
                    `}
                  >
                    Proceed to Checkout
                  </Button>
                </Flex>
              </Box>
            </Flex>
          </Box>
        </Flex>
      )}
    </Box>
  );
};

export default ShoppingCart;
