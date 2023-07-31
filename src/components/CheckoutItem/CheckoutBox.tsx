import { Flex, Text } from "@chakra-ui/react";
import { ICheckoutBox } from "../../interfaces";
import { currencyVND } from "../../utils";

const CheckoutBox = (props: ICheckoutBox) => {
  const { label, value } = props;

  return (
    <Flex
      w={"100%"}
      border={"1px"}
      borderRadius={"8px"}
      paddingX={"12px"}
      paddingY={"4px"}
      justifyContent={"space-between"}
    >
      <Text fontSize={"28px"} fontWeight={700} textTransform={"capitalize"}>
        {label}:
      </Text>
      <Text fontSize={"28px"} fontWeight={700} textTransform={"capitalize"}>
        {currencyVND(value)}
      </Text>
    </Flex>
  );
};

export default CheckoutBox;
