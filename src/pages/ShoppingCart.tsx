import {
  Box,
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
import { SHOPPING_CART_DATA } from "../utils/FakeAPI";

const ShoppingCart = () => {
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
            {SHOPPING_CART_DATA.map((item) => {
              const { id, image, name, unit_price, quantity } = item;

              const totalPrice = Number(unit_price) * quantity;
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
                      src={image.src}
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
                    {unit_price}
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
                      <MinusIcon w={"20px"} h={"20px"} cursor={"pointer"} />
                      <Input
                        border={"none"}
                        paddingY={"2px"}
                        textAlign={"center"}
                        w={"auto"}
                        focusBorderColor={"transparent"}
                        type="number"
                        value={quantity}
                        fontSize={"20px"}
                        min={1}
                      />
                      <AddIcon w={"20px"} h={"20px"} cursor={"pointer"} />
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
