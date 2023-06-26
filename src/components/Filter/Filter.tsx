import { FilterProps } from "../../interfaces";
import {
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  Heading,
  Flex,
  HStack,
  Text,
  Kbd,
} from "@chakra-ui/react";
import { FILTER_RANGE, currencyVND } from "../../utils";

const Filter = ({ filterRange, onHandleChangeFilter }: FilterProps) => {
  let minValue = filterRange.min;
  let maxValue = filterRange.max;

  if (!minValue && !maxValue) {
    minValue = FILTER_RANGE.min;
    maxValue = FILTER_RANGE.max;
  }

  let rangePriceBar = (
    <HStack spacing={4}>
      <Kbd fontSize={18} fontFamily={"lekton"} fontWeight={500}>
        {currencyVND(`${minValue}`)}
      </Kbd>
      <Text>-</Text>
      <Kbd fontSize={18} fontFamily={"lekton"} fontWeight={500}>
        {currencyVND(`${maxValue}`)}
      </Kbd>
    </HStack>
  );

  if (!minValue && maxValue) {
    rangePriceBar = (
      <Text fontSize={18} fontWeight={500}>
        Less than {currencyVND(FILTER_RANGE.min)}
      </Text>
    );
  }

  if (minValue && !maxValue) {
    rangePriceBar = (
      <Text fontSize={18} fontWeight={500}>
        More than {currencyVND(FILTER_RANGE.max)}
      </Text>
    );
  }
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
      <RangeSlider
        defaultValue={[Number(FILTER_RANGE.min), Number(FILTER_RANGE.max)]}
        min={Number(FILTER_RANGE.min)}
        max={Number(FILTER_RANGE.max)}
        step={FILTER_RANGE.step}
        onChange={(v) => {
          onHandleChangeFilter({ min: String(v[0]), max: String(v[1]) });
        }}
      >
        <RangeSliderTrack bg="red.100" boxSize={1.5} borderRadius={15}>
          <RangeSliderFilledTrack bg="tomato" />
        </RangeSliderTrack>
        <RangeSliderThumb boxSize={5} index={0} />
        <RangeSliderThumb boxSize={5} index={1} />
      </RangeSlider>
      {rangePriceBar}
    </Flex>
  );
};

export default Filter;
