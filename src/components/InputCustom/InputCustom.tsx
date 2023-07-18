import { FocusEvent, useState } from "react";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { IInputText } from "../../interfaces";

const InputCustom = (props: IInputText) => {
  const { label, name, type, onHandleChange } = props;

  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      setIsFocused(false);
    }
  };

  return (
    <FormControl>
      <FormLabel
        htmlFor={name}
        position="absolute"
        top={isFocused ? "-20px" : "10px"}
        left="10px"
        fontSize={isFocused ? "16px" : "18px"}
        px={isFocused ? "5px" : "0"}
        transition="all 0.4s ease"
        pointerEvents="none"
        fontWeight={400}
        textTransform={"capitalize"}
        backgroundColor={"white"}
        zIndex={1000}
      >
        {label}
      </FormLabel>
      <Input
        type={type}
        id={name}
        onFocus={handleFocus}
        onBlur={handleBlur}
        focusBorderColor="black"
        fontSize={"24px"}
        fontWeight={400}
        name={name}
        onChange={onHandleChange}
      />
    </FormControl>
  );
};

export default InputCustom;
