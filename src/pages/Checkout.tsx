import { Flex, Heading } from "@chakra-ui/react";
import {
  CheckoutBox,
  CheckoutItem,
  FormHook,
  PaymentGroup,
} from "../components";
import {
  CheckoutProps,
  IPaymentGroupData,
  ICountry,
  IState,
  ICity,
} from "../interfaces";
import {
  InputControl,
  RadioGroupControl,
  SelectControl,
  SubmitButton,
} from "react-hook-form-chakra";

const Checkout = (props: CheckoutProps) => {
  const {
    state,
    countries,
    states,
    cities,
    isLoading,
    onHandlePlaceOrder,
    onHandleChangeCountryCode,
  } = props;

  const { data, subTotal, total, coupon } = state;

  const paymentItems: IPaymentGroupData[] = [
    {
      name: "vnpay",
      value: "vnpay",
      image: "http://localhost/wordpress/wp-content/uploads/2023/07/vnpay.png",
    },
    {
      name: "cash",
      value: "bacs",
      image: "http://localhost/wordpress/wp-content/uploads/2023/07/cash.png",
    },
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
      <FormHook onHandleSubmit={onHandlePlaceOrder}>
        <Flex flexDirection={"column"} alignItems={"flex-end"}>
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
                <InputControl name="first_name" label="First Name" />
                <InputControl name="last_name" label="Last Name" />
              </Flex>
              <Flex columnGap={"54px"}>
                <InputControl name="email" label="Email" />
                <InputControl name="phone" label="Phone Number" />
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
                <SelectControl
                  name="countryCode"
                  label="Select Your Country"
                  selectProps={{ placeholder: "Select option" }}
                  onChange={onHandleChangeCountryCode}
                >
                  {countries.map((country: ICountry) => {
                    const { isoCode, name } = country;
                    return (
                      <option value={isoCode} key={isoCode}>
                        {name}
                      </option>
                    );
                  })}
                </SelectControl>
                <SelectControl
                  name="stateCode"
                  label="Select Your City"
                  selectProps={{ placeholder: "Select option" }}
                  onChange={onHandleChangeCountryCode}
                >
                  {states.map((state: IState) => {
                    const { isoCode, name } = state;
                    return (
                      <option value={isoCode} key={isoCode}>
                        {name}
                      </option>
                    );
                  })}
                </SelectControl>
                <SelectControl
                  name="city"
                  label="Select Your Town"
                  selectProps={{ placeholder: "Select option" }}
                >
                  {cities.map((city: ICity, index: number) => {
                    const { name } = city;
                    return (
                      <option value={name} key={index}>
                        {name}
                      </option>
                    );
                  })}
                </SelectControl>
              </Flex>
              <Flex columnGap={"54px"}>
                <InputControl name="street" label="Street" />
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
                const {
                  id,
                  images,
                  name,
                  quantity,
                  regular_price,
                  sale_price,
                } = item;
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
              {coupon && (
                <CheckoutBox label="voucher" value={`-${coupon?.amount}`} />
              )}
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
              <RadioGroupControl
                name="paymentMethod"
                label="Payment method"
                w={"100%"}
              >
                <PaymentGroup data={paymentItems} name="paymentMethod" />
              </RadioGroupControl>
            </Flex>
          </Flex>
          <SubmitButton
            maxW={"355px"}
            minW={"355px"}
            fontSize={"24px"}
            textTransform={"capitalize"}
            backgroundColor={"#FFFFFF"}
            border={"1px"}
            borderColor={"#f17346"}
            color={"#f17346"}
            _hover={{
              backgroundColor: "#f17346",
              color: "#FFFFFF",
            }}
            isLoading={isLoading}
          >
            place order
          </SubmitButton>
        </Flex>
      </FormHook>
    </Flex>
  );
};

export default Checkout;
