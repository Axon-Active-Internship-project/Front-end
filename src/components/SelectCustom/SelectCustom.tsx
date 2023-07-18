import React, { useState } from "react";
import { Select, FormControl, FormLabel } from "@chakra-ui/react";

const SelectCustom = ({ label, options, ...rest }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <FormControl>
      <FormLabel
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
      <Select
        {...rest}
        onFocus={handleFocus}
        onBlur={handleBlur}
        borderBottom={isFocused ? "2px solid blue" : "1px solid #ccc"}
        _focus={{
          borderBottom: "2px solid blue",
        }}
        defaultValue={""}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectCustom;
