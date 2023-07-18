import { Flex, Heading, Input } from "@chakra-ui/react";
import {
  CheckoutBox,
  CheckoutItem,
  InputCustom,
  SelectCustom,
} from "../components";
import { CheckoutProps } from "../interfaces";

const Checkout = (props: CheckoutProps) => {
  const { state } = props;

  const { data, subTotal, total, coupon } = state;

  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];
  return (
    <Flex flexDirection={"column"}>
      <Heading
        fontSize={48}
        fontWeight={700}
        textTransform={"uppercase"}
        mb={"48px"}
        textAlign={"center"}
      >
        checkout
      </Heading>

      <Flex flexDirection={"column"}>
        <Flex
          flexDirection={"row"}
          justifyContent={"space-between"}
          w={"100%"}
          mb={"36px"}
        >
          <Flex flexDirection={"column"} flex={1}>
            <Heading fontSize={"24px"} fontWeight={700}>
              01
            </Heading>
            <Heading
              fontSize={"32px"}
              fontWeight={700}
              textTransform={"uppercase"}
            >
              Presonal details
            </Heading>
          </Flex>
          <Flex flexDirection={"column"} flex={2.8} rowGap={"32px"}>
            <Flex columnGap={"54px"}>
              <InputCustom
                label={"first name"}
                name="firstName"
                onHandleChange={() => {}}
              />
              <InputCustom
                label={"last name"}
                name="lastName"
                onHandleChange={() => {}}
              />
            </Flex>
            <Flex columnGap={"54px"}>
              <InputCustom
                label={"email"}
                name="email"
                type="email"
                onHandleChange={() => {}}
              />
              <InputCustom
                label={"phone"}
                name="phone"
                onHandleChange={() => {}}
              />
            </Flex>
          </Flex>
        </Flex>

        <Flex
          flexDirection={"row"}
          justifyContent={"space-between"}
          w={"100%"}
          mb={"36px"}
        >
          <Flex flexDirection={"column"} flex={1}>
            <Heading fontSize={"24px"} fontWeight={700}>
              02
            </Heading>
            <Heading
              fontSize={"32px"}
              fontWeight={700}
              textTransform={"uppercase"}
            >
              shipping details
            </Heading>
          </Flex>
          <Flex flexDirection={"column"} flex={2.8} rowGap={"32px"}>
            <Flex columnGap={"54px"}>
              <SelectCustom label={"country"} options={options} />
              <Input />
              <Input />
            </Flex>
            <Flex columnGap={"54px"}>
              <InputCustom
                label={"address"}
                name="address"
                onHandleChange={() => {}}
              />
            </Flex>
          </Flex>
        </Flex>

        <Flex
          flexDirection={"row"}
          justifyContent={"space-between"}
          w={"100%"}
          mb={"36px"}
        >
          <Flex flexDirection={"column"} flex={1}>
            <Heading fontSize={"24px"} fontWeight={700}>
              03
            </Heading>
            <Heading
              fontSize={"32px"}
              fontWeight={700}
              textTransform={"uppercase"}
            >
              Order summary
            </Heading>
          </Flex>
          <Flex flexDirection={"column"} flex={2.8} rowGap={"32px"}>
            {data.map((item) => {
              const { id, images, name, quantity, regular_price, sale_price } =
                item;
              return (
                <CheckoutItem
                  key={id}
                  name={name}
                  quantity={quantity}
                  unit_price={sale_price || regular_price}
                  image={images?.[0].src}
                />
              );
            })}
            <CheckoutBox label="sub total" value={subTotal} />
            {coupon && <CheckoutBox label="voucher" value={coupon?.amount} />}
            <CheckoutBox label="Total" value={total} />
          </Flex>
        </Flex>

        <Flex
          flexDirection={"row"}
          justifyContent={"space-between"}
          w={"100%"}
          mb={"36px"}
        >
          <Flex flexDirection={"column"} flex={1}>
            <Heading fontSize={"24px"} fontWeight={700}>
              04
            </Heading>
            <Heading
              fontSize={"32px"}
              fontWeight={700}
              textTransform={"uppercase"}
            >
              payment method
            </Heading>
          </Flex>
          <Flex flexDirection={"column"} flex={2.8} rowGap={"32px"}>
            {data.map((item) => {
              const { id, images, name, quantity, regular_price, sale_price } =
                item;
              return (
                <CheckoutItem
                  key={id}
                  name={name}
                  quantity={quantity}
                  unit_price={sale_price || regular_price}
                  image={images?.[0].src}
                />
              );
            })}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Checkout;
