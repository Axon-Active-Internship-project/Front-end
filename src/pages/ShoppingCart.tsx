import {
  Button,
  Flex,
  Heading,
  Image,
  Input,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { TABLE_HEADER, currencyVND, isExistItem } from "../utils";
import { ShoppingCartProps } from "../interfaces";
import { useMemo } from "react";

const ShoppingCart = ({
  data,
  onDelete,
  onHandleChange,
}: ShoppingCartProps) => {
  const subTotal = useMemo(() => {
    return data.reduce((total, currentValue) => {
      const price =
        Number(currentValue.sale_price || currentValue.regular_price) *
        currentValue.quantity;
      return (total += price);
    }, 0);
  }, [data]);

  const onHandleIncrementQuantity = (id: number) => {
    if (!isExistItem) {
      return;
    }

    return onHandleChange(
      data.map((item) => {
        if (item.id === id) {
          const newQuantity = item.quantity + 1;
          if (item.quantity >= item?.stock_quantity && item?.stock_quantity) {
            return { ...item };
          }

          return { ...item, quantity: newQuantity };
        }

        return item;
      })
    );
  };

  const onHandleReduceQuantity = (id: number) => {
    if (!isExistItem) {
      return;
    }

    return onHandleChange(
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

  const onHandleChangeQuantity = (
    id: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!isExistItem) {
      return;
    }
    return onHandleChange(
      data.map((item) => {
        if (item.id === id) {
          if (Number(e.target.value) <= 0) {
            return { ...item, quantity: 1 };
          }

          if (e.target.value > item?.stock_quantity && item?.stock_quantity) {
            return { ...item, quantity: item?.stock_quantity };
          }
          return { ...item, quantity: e.target.value };
        }
        return item;
      })
    );
  };

  const preventMinus = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "-" || e.key === "+") {
      e.preventDefault();
    }
  };

  return (
    <Flex paddingX={"136px"} flexDirection={"column"}>
      <Heading mb={"48px"}>Shopping cart</Heading>
      <TableContainer>
        <Table variant={"simple"} borderWidth={"1px"} borderColor={"black"}>
          <Thead>
            <Tr>
              {TABLE_HEADER.map((item, index) => (
                <Th
                  key={index}
                  textAlign={"center"}
                  borderWidth={"1px"}
                  borderColor={"black"}
                  color={"black"}
                  fontSize={"20px"}
                  fontWeight={700}
                >
                  {item}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {data?.map((item) => {
              const { id, image, name, regular_price, sale_price, quantity } =
                item;
              const totalPrice = quantity * Number(sale_price || regular_price);
              return (
                <Tr
                  key={id}
                  borderWidth={"1px"}
                  borderColor={"black"}
                  color={"black"}
                  fontSize={"20px"}
                  fontWeight={400}
                  textTransform={"capitalize"}
                >
                  <Td borderWidth={"1px"} borderColor={"black"} color={"black"}>
                    <Image
                      src={image}
                      w={"200px"}
                      h={"200px"}
                      objectFit={"cover"}
                    />
                  </Td>
                  <Td
                    borderWidth={"1px"}
                    borderColor={"black"}
                    color={"black"}
                    textAlign={"center"}
                  >
                    {name}
                  </Td>
                  <Td
                    borderWidth={"1px"}
                    borderColor={"black"}
                    color={"black"}
                    textAlign={"center"}
                  >
                    {currencyVND(sale_price || regular_price || "0")}
                  </Td>
                  <Td
                    borderWidth={"1px"}
                    borderColor={"black"}
                    color={"black"}
                    textAlign={"center"}
                  >
                    <Flex
                      justifyContent={"space-between"}
                      alignItems={"center"}
                      w={"160px"}
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
                        onChange={(e) => onHandleChangeQuantity(id, e)}
                        onKeyDown={preventMinus}
                      />
                      <AddIcon
                        w={"20px"}
                        h={"20px"}
                        cursor={"pointer"}
                        onClick={() => onHandleIncrementQuantity(id)}
                      />
                    </Flex>
                  </Td>
                  <Td
                    borderWidth={"1px"}
                    borderColor={"black"}
                    color={"black"}
                    textAlign={"center"}
                  >
                    {currencyVND(String(totalPrice))}
                  </Td>
                  <Td
                    borderWidth={"1px"}
                    borderColor={"black"}
                    color={"black"}
                    textAlign={"center"}
                  >
                    <Button onClick={() => onDelete(id)}>Remove</Button>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  );
};

export default ShoppingCart;
