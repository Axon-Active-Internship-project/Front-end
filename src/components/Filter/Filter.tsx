import { FilterProps } from "../../interfaces";
import { useState } from "react";
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

const Filter = ({
  minValue,
  maxValue,
  step = 5,
  onHandleFilter,
}: FilterProps) => {
  const [sliderValue, setSliderValue] = useState([minValue, maxValue]);

  return (
    <Flex
      flexDirection={"column"}
      gap={4}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Heading as={"h3"} fontSize={22}>
        Fillter By Price
      </Heading>
      <RangeSlider
        defaultValue={[minValue, maxValue]}
        min={minValue}
        max={maxValue}
        step={step}
        onChange={(v) => {
          onHandleFilter(v[0], v[1]);
          setSliderValue(v);
        }}
      >
        <RangeSliderTrack bg="red.100" boxSize={1.5} borderRadius={15}>
          <RangeSliderFilledTrack bg="tomato" />
        </RangeSliderTrack>
        <RangeSliderThumb boxSize={5} index={0} />
        <RangeSliderThumb boxSize={5} index={1} />
      </RangeSlider>
      <HStack spacing={4}>
        <Kbd fontSize={16}>{sliderValue[0]} đ</Kbd>
        <Text>-</Text>
        <Kbd fontSize={16}> {sliderValue[1]} đ</Kbd>
      </HStack>
    </Flex>
  );
};

export default Filter;
