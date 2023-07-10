import { Flex, Stack, Text, RadioGroup, Radio } from "@chakra-ui/react";
import { FILTER_RANGE, currencyVND } from "../../utils";
import { FilterProps } from "../../interfaces";

const Filter = ({ priceSelect, onHandleChangePriceRange }: FilterProps) => {
  return (
    <Flex flexDirection={"column"} justifyContent={"center"}>
      <RadioGroup
        name="price"
        defaultValue={priceSelect}
        onChange={onHandleChangePriceRange}
        value={priceSelect}
      >
        <Stack>
          {FILTER_RANGE.map((item, index) => {
            const { min, max } = item;
            let label;

            if (!min && !max) {
              label = `All`;
            }

            if (!min && max) {
              label = `Less than ${currencyVND(String(Number(max) + 1))}`;
            }

            if (min && !max) {
              label = `More than ${currencyVND(String(Number(min) - 1))}`;
            }

            if (min && max) {
              label = `From ${currencyVND(min)} to ${currencyVND(max)} `;
            }

            return (
              <Radio value={String(index)} key={index}>
                <Text fontSize={18} fontWeight={500}>
                  {label}
                </Text>
              </Radio>
            );
          })}
        </Stack>
      </RadioGroup>
    </Flex>
  );
};

export default Filter;
