import { HStack, useRadioGroup } from "@chakra-ui/react";
import PaymentItem from "./PaymentItem";
import { PaymentGroupProps } from "../../interfaces";

const PaymentGroup = (props: PaymentGroupProps) => {
  const { data, name, onChange } = props;

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: name,
    onChange: onChange,
    defaultValue: "vnpay",
  });

  const group = getRootProps();
  return (
    <HStack {...group}>
      {data.map((item) => {
        const { image, name } = item;
        const radio = getRadioProps({ value: name });
        return (
          <PaymentItem key={name} {...radio} image={image}>
            {name}
          </PaymentItem>
        );
      })}
    </HStack>
  );
};

export default PaymentGroup;
