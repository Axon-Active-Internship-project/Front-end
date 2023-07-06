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
import { TABLE_HEADER, currencyVND } from "../utils";
import { ShoppingCartProps } from "../interfaces";

const ShoppingCart = ({
  data,
  onDelete,
  onIncrementQuantity,
  onReduceQuantity,
  onHandleChangeQuantity,
}: ShoppingCartProps) => {
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
            {data?.map((item, index) => {
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
                    {(sale_price || regular_price) &&
                      currencyVND(sale_price ? sale_price : regular_price)}
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
                        onClick={() => onReduceQuantity(id)}
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
                      />
                      <AddIcon
                        w={"20px"}
                        h={"20px"}
                        cursor={"pointer"}
                        onClick={() => onIncrementQuantity(id)}
                      />
                    </Flex>
                  </Td>
                  <Td
                    borderWidth={"1px"}
                    borderColor={"black"}
                    color={"black"}
                    textAlign={"center"}
                  >
                    {!!totalPrice && currencyVND(String(totalPrice))}
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
