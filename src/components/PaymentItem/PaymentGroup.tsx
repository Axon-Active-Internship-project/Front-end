import { HStack, forwardRef, useRadioGroup } from "@chakra-ui/react";
import PaymentItem from "./PaymentItem";
import { useController } from "react-hook-form";
import { PaymentItemProps } from "./../../interfaces/checkout";

const PaymentGroup = forwardRef(
  ({ control, name, defaultValue, ...props }, ref) => {
    const { field } = useController({
      name,
      control,
      rules: { required: "Toggle is required" },
      defaultValue,
    });

    const { getRootProps, getRadioProps } = useRadioGroup({
      ...field,
    });

    const group = getRootProps();

    return (
      <HStack {...group} w={"100%"}>
        {props.data.map((item: PaymentItemProps) => {
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
  }
);

export default PaymentGroup;
