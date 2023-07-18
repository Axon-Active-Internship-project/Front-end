import { Flex, HStack, Image, Text } from "@chakra-ui/react";
import { ICheckoutItem } from "../../interfaces";
import { useMemo } from "react";
import { currencyVND } from "../../utils";

const CheckoutItem = (props: ICheckoutItem) => {
  const { name, unit_price, quantity, image } = props;

  const total = useMemo(() => {
    return quantity * Number(unit_price);
  }, [quantity, unit_price]);

  return (
    <Flex
      w={"100%"}
      border={"1px"}
      borderRadius={"8px"}
      paddingX={"30px"}
      paddingY={"20px"}
      gap={"24px"}
    >
      <Image src={image} w={"150px"} h={"150px"} />
      <Flex flexDirection={"column"}>
        <Text fontSize={"24px"} fontWeight={400} textTransform={"capitalize"}>
          {name}
        </Text>
        <HStack>
          <Text
            fontSize={"20px"}
            fontWeight={400}
            textTransform={"capitalize"}
            minW={"150px"}
          >
            unit price:
          </Text>
          <Text fontSize={"20px"} fontWeight={400} textTransform={"capitalize"}>
            {currencyVND(unit_price)}
          </Text>
        </HStack>
        <HStack>
          <Text
            fontSize={"20px"}
            fontWeight={400}
            textTransform={"capitalize"}
            minW={"150px"}
          >
            quantity:
          </Text>
          <Text fontSize={"20px"} fontWeight={400} textTransform={"capitalize"}>
            {quantity}
          </Text>
        </HStack>
        <HStack>
          <Text
            fontSize={"20px"}
            fontWeight={400}
            textTransform={"capitalize"}
            minW={"150px"}
          >
            total:
          </Text>
          <Text fontSize={"20px"} fontWeight={400} textTransform={"capitalize"}>
            {currencyVND(String(total))}
          </Text>
        </HStack>
      </Flex>
    </Flex>
  );
};

export default CheckoutItem;
