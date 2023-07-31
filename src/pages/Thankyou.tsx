import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { IProduct, ThankyouProps } from "../interfaces";
import { currencyVND } from "../utils";
import dateFormat from "dateformat";
import { Loading } from "../components";
const Thankyou = ({
  data,
  onHandleBackToShop,
  onHandleReorder,
}: ThankyouProps) => {
  const { line_items, total, shipping, date_created } = data;
  const { first_name, last_name, phone, country, state, city, address_1 } =
    shipping;

  if (data.status === "pending" || data.status === "on-hold") {
    return (
      <Flex
        paddingX={"32px"}
        gap={"48px"}
        minH={"51.8vh"}
        justifyContent={"center"}
        alignItems={"center"}
        flexDirection={"column"}
      >
        <Heading textTransform={"capitalize"}>Waitting payment</Heading>
        <Loading />
      </Flex>
    );
  }

  if (data.status === "failed") {
    return (
      <Flex
        paddingX={"32px"}
        gap={"48px"}
        minH={"51.8vh"}
        justifyContent={"center"}
        alignItems={"center"}
        flexDirection={"column"}
      >
        <Heading textTransform={"capitalize"}>failed</Heading>
        <Flex>
          <Flex
            paddingX={"70px"}
            paddingY={"32px"}
            backgroundColor={"rgba(217, 217, 217, 0.10)"}
            boxShadow={"0px 4px 4px 0px rgba(0, 0, 0, 0.25)"}
            flexDirection={"column"}
            gap={"18px"}
            textTransform={"capitalize"}
            mb={"32px"}
          >
            <VStack alignItems={"flex-start"} gap={0} w={"100%"}>
              <Text fontSize={"20px"} fontWeight={"700"}>
                Full name:
              </Text>
              <Text
                fontSize={"20px"}
                fontWeight={"700"}
                color={"rgba(0, 0, 0, 0.30)"}
              >
                {`${last_name} ${first_name}`}
              </Text>
            </VStack>

            <VStack alignItems={"flex-start"} gap={0} w={"100%"}>
              <Text fontSize={"20px"} fontWeight={"700"}>
                phone:
              </Text>
              <Text
                fontSize={"20px"}
                fontWeight={"700"}
                color={"rgba(0, 0, 0, 0.30)"}
              >
                {phone}
              </Text>
            </VStack>

            <VStack alignItems={"flex-start"} gap={0} w={"100%"}>
              <Text fontSize={"20px"} fontWeight={"700"}>
                Order Date:
              </Text>
              <Text
                fontSize={"20px"}
                fontWeight={"700"}
                color={"rgba(0, 0, 0, 0.30)"}
              >
                {dateFormat(date_created, "h:MM:ss TT mm/dd/yyyy")}
              </Text>
            </VStack>

            <VStack alignItems={"flex-start"} gap={0} w={"100%"}>
              <Text fontSize={"20px"} fontWeight={"700"}>
                items:
              </Text>
              <Text
                fontSize={"20px"}
                fontWeight={"700"}
                color={"rgba(0, 0, 0, 0.30)"}
              >
                {line_items.map((item: IProduct, index: number, row: any) => {
                  if (index + 1 === row.length) {
                    return item.name;
                  } else {
                    return item.name + ", ";
                  }
                })}
              </Text>
            </VStack>

            {data.coupon && (
              <VStack alignItems={"flex-start"} gap={0} w={"100%"}>
                <Text fontSize={"20px"} fontWeight={"700"}>
                  coupon:
                </Text>
                <Text
                  fontSize={"20px"}
                  fontWeight={"700"}
                  color={"rgba(0, 0, 0, 0.30)"}
                >
                  {currencyVND(data.coupon.amount)}
                </Text>
              </VStack>
            )}

            <VStack alignItems={"flex-start"} gap={0} w={"100%"}>
              <Text fontSize={"20px"} fontWeight={"700"}>
                total:
              </Text>
              <Text
                fontSize={"20px"}
                fontWeight={"700"}
                color={"rgba(0, 0, 0, 0.30)"}
              >
                {currencyVND(total)}
              </Text>
            </VStack>

            <VStack alignItems={"flex-start"} gap={0} w={"100%"}>
              <Text fontSize={"20px"} fontWeight={"700"}>
                Shipping Address:
              </Text>
              <Text
                fontSize={"20px"}
                fontWeight={"700"}
                color={"rgba(0, 0, 0, 0.30)"}
              >
                {`${address_1}, ${state}, ${country}`}
              </Text>
            </VStack>
          </Flex>
        </Flex>
        <Flex justifyContent={"space-around"} w={"100%"}>
          <Button
            w={"100%"}
            minW={"123px"}
            maxW={"250px"}
            textTransform={"capitalize"}
            fontSize={"24px"}
            backgroundColor={"#363636"}
            color={"#FFFFFF"}
            _hover={{
              backgroundColor: "#ff6a28",
            }}
            onClick={onHandleReorder}
          >
            re_order
          </Button>

          <Button
            w={"100%"}
            minW={"123px"}
            maxW={"250px"}
            textTransform={"capitalize"}
            fontSize={"24px"}
            backgroundColor={"#363636"}
            color={"#FFFFFF"}
            _hover={{
              backgroundColor: "#ff6a28",
            }}
            onClick={onHandleBackToShop}
          >
            back to products
          </Button>
        </Flex>
      </Flex>
    );
  }

  return (
    <Flex paddingX={"32px"} gap={"48px"} minH={"51.8vh"}>
      <Box flex={1}>
        <Image
          w={"100%"}
          src={"src/assets/images/thankyou.png"}
          objectFit={"contain"}
        />
      </Box>
      <Flex
        flexDirection={"column"}
        alignItems={"flex-end"}
        flex={1}
        maxW={"50%"}
      >
        <Flex flexDirection={"column"} alignItems={"center"}>
          <Heading fontSize={"32px"} fontWeight={"700"} mb={"32px"}>
            Thank You For Your Ordering
          </Heading>
          <Flex
            paddingX={"70px"}
            paddingY={"32px"}
            backgroundColor={"rgba(217, 217, 217, 0.10)"}
            boxShadow={"0px 4px 4px 0px rgba(0, 0, 0, 0.25)"}
            flexDirection={"column"}
            gap={"18px"}
            textTransform={"capitalize"}
            mb={"32px"}
            wordBreak={"break-word"}
          >
            <VStack alignItems={"flex-start"} gap={0} w={"100%"}>
              <Text fontSize={"20px"} fontWeight={"700"}>
                Full name:
              </Text>
              <Text
                fontSize={"20px"}
                fontWeight={"700"}
                color={"rgba(0, 0, 0, 0.30)"}
              >
                {`${last_name} ${first_name}`}
              </Text>
            </VStack>

            <VStack alignItems={"flex-start"} gap={0} w={"100%"}>
              <Text fontSize={"20px"} fontWeight={"700"}>
                phone:
              </Text>
              <Text
                fontSize={"20px"}
                fontWeight={"700"}
                color={"rgba(0, 0, 0, 0.30)"}
              >
                {phone}
              </Text>
            </VStack>

            <VStack alignItems={"flex-start"} gap={0} w={"100%"}>
              <Text fontSize={"20px"} fontWeight={"700"}>
                Order Date:
              </Text>
              <Text
                fontSize={"20px"}
                fontWeight={"700"}
                color={"rgba(0, 0, 0, 0.30)"}
              >
                {dateFormat(date_created, "h:MM:ss TT mm/dd/yyyy")}
              </Text>
            </VStack>

            <VStack alignItems={"flex-start"} gap={0} w={"100%"}>
              <Text fontSize={"20px"} fontWeight={"700"}>
                items:
              </Text>
              <Text
                fontSize={"20px"}
                fontWeight={"700"}
                color={"rgba(0, 0, 0, 0.30)"}
              >
                {line_items.map((item: IProduct, index: number, row: any) => {
                  if (index + 1 === row.length) {
                    return item.name;
                  } else {
                    return item.name + ", ";
                  }
                })}
              </Text>
            </VStack>

            {data.coupon && (
              <VStack alignItems={"flex-start"} gap={0} w={"100%"}>
                <Text fontSize={"20px"} fontWeight={"700"}>
                  coupon:
                </Text>
                <Text
                  fontSize={"20px"}
                  fontWeight={"700"}
                  color={"rgba(0, 0, 0, 0.30)"}
                >
                  {currencyVND(data.coupon.amount)}
                </Text>
              </VStack>
            )}

            <VStack alignItems={"flex-start"} gap={0} w={"100%"}>
              <Text fontSize={"20px"} fontWeight={"700"}>
                total:
              </Text>
              <Text
                fontSize={"20px"}
                fontWeight={"700"}
                color={"rgba(0, 0, 0, 0.30)"}
              >
                {currencyVND(total)}
              </Text>
            </VStack>

            <VStack alignItems={"flex-start"} gap={0} w={"100%"}>
              <Text fontSize={"20px"} fontWeight={"700"}>
                Shipping Address:
              </Text>
              <Text
                fontSize={"20px"}
                fontWeight={"700"}
                color={"rgba(0, 0, 0, 0.30)"}
              >
                {`${address_1}, ${state}, ${country}`}
              </Text>
            </VStack>
          </Flex>
        </Flex>
        <Button
          w={"100%"}
          minW={"123px"}
          maxW={"250px"}
          textTransform={"capitalize"}
          fontSize={"24px"}
          backgroundColor={"#363636"}
          color={"#FFFFFF"}
          _hover={{
            backgroundColor: "#ff6a28",
          }}
          onClick={onHandleBackToShop}
        >
          Continue
        </Button>
      </Flex>
    </Flex>
  );
};

export default Thankyou;
