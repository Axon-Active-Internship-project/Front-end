import { Button, Flex, Heading, Radio } from "@chakra-ui/react";
import {
  CheckoutBox,
  CheckoutItem,
  FormHook,
  PaymentGroup,
} from "../components";
import { CheckoutProps, IPaymentGroupData } from "../interfaces";
import {
  InputControl,
  RadioGroupControl,
  SelectControl,
  SubmitButton,
} from "react-hook-form-chakra";
import PaymentItem from "../components/PaymentItem/PaymentItem";

const Checkout = (props: CheckoutProps) => {
  const { state, onHandleChangePaymentMethod, onHandlePlaceOrder } = props;



  const { data, subTotal, total, coupon } = state;

  const options = [
    {
      id: 101,
      name: "India",
      iso2: "IN",
    },
    {
      id: 102,
      name: "Viet Nam",
      iso2: "VN",
    },
    {
      id: 103,
      name: "United States",
      iso2: "US",
    },
  ];

  const paymentItems: IPaymentGroupData[] = [
    {
      name: "vnpay",
      image: "http://localhost/wordpress/wp-content/uploads/2023/07/bo.jpg",
    },
    {
      name: "cash",
      image: "http://localhost/wordpress/wp-content/uploads/2023/07/khobo.jpg",
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
      <FormHook>
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
                <InputControl name="firstName" label="First Name" />
                <InputControl name="firstName" label="First Name" />
              </Flex>
              <Flex columnGap={"54px"}>
                <InputControl name="firstName" label="First Name" />
                <InputControl name="firstName" label="First Name" />
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
                  name="callbackTime"
                  label="Preferred callback time"
                  selectProps={{ placeholder: "Select option" }}
                >
                  <option value="morning">Morning</option>
                  <option value="afternoon">Afternoon</option>
                  <option value="evening">Evening</option>
                </SelectControl>
                <SelectControl
                  name="callbackTime"
                  label="Preferred callback time"
                  selectProps={{ placeholder: "Select option" }}
                >
                  <option value="morning">Morning</option>
                  <option value="afternoon">Afternoon</option>
                  <option value="evening">Evening</option>
                </SelectControl>
                <SelectControl
                  name="callbackTime"
                  label="Preferred callback time"
                  selectProps={{ placeholder: "Select option" }}
                >
                  <option value="morning">Morning</option>
                  <option value="afternoon">Afternoon</option>
                  <option value="evening">Evening</option>
                </SelectControl>
              </Flex>
              <Flex columnGap={"54px"}>
                <InputControl name="firstName" label="First Name" />
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
      
              <RadioGroupControl name="favoriteColor" label="Favorite Color">
                <PaymentItem name="vnpay" value="vnpay" />
                <PaymentItem name="vnpay" />

              </RadioGroupControl>
              
            
            </Flex>
          </Flex>
          {/* <Button
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
            type="submit"
            isLoading={isSubmitting}
          >
            place order
          </Button> */}
          <SubmitButton>Submit</SubmitButton>
        </Flex>
      </FormHook>
    </Flex>
  );
};

export default Checkout;
