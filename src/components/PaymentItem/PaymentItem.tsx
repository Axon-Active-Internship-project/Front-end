import { Box, Flex, Image, Text, forwardRef, useRadio } from "@chakra-ui/react";

const PaymentItem = forwardRef(({ children, ...props }, ref) => {
  const { getInputProps, getRadioProps } = useRadio(props);


  const input = getInputProps({ ref });
  const checkbox = getRadioProps();

  return (
    <Flex
      as={"label"}
      w={"100%"}
      p={"20px"}
      cursor="pointer"
      borderWidth="1px"
      borderRadius="md"
      border={"1px"}
      px={5}
      py={3}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <input {...input} />
      <Flex alignItems={"center"} gap={"24px"}>
        <Image src={props.image} w={"50px"} h={"40px"} objectFit={"cover"} />
        <Text fontSize={"24px"} fontWeight={700} textTransform={"capitalize"}>
          {children}
        </Text>
      </Flex>
      <Box
        border={"1px"}
        borderColor={"#4C4C4B"}
        padding={"8px"}
        borderRadius={"99px"}
        {...checkbox}
        _checked={{
          borderColor: "#001AFF",
        }}
      >
        <Box
          border={"1px"}
          borderColor={"#4C4C4B"}
          padding={"4px"}
          borderRadius={"99px"}
          {...checkbox}
          _checked={{
            borderColor: "#001AFF",
            backgroundColor: "#001AFF",
          }}
        ></Box>
      </Box>
    </Flex>
  );
});

export default PaymentItem;
