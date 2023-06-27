import {
  Heading,
  Flex,
  Stack,
  Text,
  RadioGroup,
  Radio,
} from "@chakra-ui/react";
import { FILTER_RANGE } from "../../utils";
import { FilterProps } from "../../interfaces";

const Filter = ({ priceSelect, onHandleChangePriceRange }: FilterProps) => {
  return (
    <Flex
      flexDirection={"column"}
      gap={4}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Heading as={"h3"} fontSize={22}>
        Filter
      </Heading>
      <RadioGroup name="price" defaultValue={priceSelect}>
        <Stack>
          <Radio value="" onChange={() => onHandleChangePriceRange("")}>
            <Text fontSize={18} fontWeight={500}>
              All
            </Text>
          </Radio>
          {FILTER_RANGE.map((item, index) => {
            const { min, max } = item;
            let label;

            if (!min && max) {
              label = `Less than ${max} `;
            }

            if (min && !max) {
              label = `More than ${min}  `;
            }

            if (min && max) {
              label = `From ${min} to ${max} `;
            }

            return (
              <Radio
                value={String(index)}
                key={index}
                onChange={() => onHandleChangePriceRange(String(index))}
              >
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
