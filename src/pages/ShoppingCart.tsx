import {
  Box,
  Flex,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

const ShoppingCart = () => {
  return (
    <Flex paddingX={"136px"} flexDirection={"column"}>
      <Heading mb={"48px"}>Shopping cart</Heading>
      <TableContainer>
        <Table
          variant={"simple"}
          borderWidth={"1px"}
          borderColor={"black"}
          colorScheme="black"
        >
          <Thead>
            <Tr>
              <Th>Image</Th>
              <Th>Product name</Th>
              <Th>Unit price</Th>
              <Th>Quantity</Th>
              <Th>Total</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>inches</Td>
              <Td>millimetres (mm)</Td>
              <Td>25.4</Td>
              <Td>25.4</Td>
              <Td>25.4</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  );
};

export default ShoppingCart;
