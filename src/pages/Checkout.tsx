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
  IProvince,
  IDistrict,
  IWard,
} from "../interfaces";
import {
  InputControl,
  RadioGroupControl,
  SelectControl,
  SubmitButton,
} from "react-hook-form-chakra";
import { NO_IMAGE } from "../utils";

const Checkout = (props: CheckoutProps) => {
  const {
    state,
    provinces,
    districts,
    wards,
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
                <InputControl
                  name="first_name"
                  label="First Name"
                  inputProps={{
                    maxLength: 40,
                    placeholder: "First name",
                  }}
                />
                <InputControl
                  name="last_name"
                  label="Last Name"
                  inputProps={{
                    maxLength: 40,
                    placeholder: "Last name",
                  }}
                />
              </Flex>
              <Flex columnGap={"54px"}>
                <InputControl
                  name="email"
                  label="Email"
                  inputProps={{
                    maxLength: 256,
                    placeholder: "Email",
                  }}
                />
                <InputControl
                  name="phone"
                  label="Phone Number"
                  inputProps={{
                    placeholder: "Phone number",
                    type: "number",
                    maxLength: 10,
                  }}
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
                <SelectControl
                  name="provinceCode"
                  label="Select Your Province/City"
                  selectProps={{ placeholder: "Select your province" }}
                  onChange={onHandleChangeCountryCode}
                >
                  {provinces.map((province: IProvince) => {
                    const { code, name } = province;
                    return (
                      <option value={code} key={code}>
                        {name}
                      </option>
                    );
                  })}
                </SelectControl>
                <SelectControl
                  name="districtCode"
                  label="Select Your District"
                  selectProps={{ placeholder: "Select your district" }}
                  onChange={onHandleChangeCountryCode}
                >
                  {districts.map((district: IDistrict) => {
                    const { code, name } = district;
                    return (
                      <option value={code} key={code}>
                        {name}
                      </option>
                    );
                  })}
                </SelectControl>
                <SelectControl
                  name="wardCode"
                  label="Select Your Ward"
                  selectProps={{ placeholder: "Select your ward" }}
                  onChange={onHandleChangeCountryCode}
                >
                  {wards.map((ward: IWard) => {
                    const { name, code } = ward;
                    return (
                      <option value={code} key={code}>
                        {name}
                      </option>
                    );
                  })}
                </SelectControl>
              </Flex>
              <Flex columnGap={"54px"}>
                <InputControl
                  name="street"
                  label="Your Street"
                  inputProps={{
                    placeholder: "Your street",
                  }}
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
                    image={images?.[0]?.src || NO_IMAGE}
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
              <RadioGroupControl name="paymentMethod" w={"100%"}>
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
