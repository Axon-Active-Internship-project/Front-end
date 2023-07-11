import { Flex, Text } from "@chakra-ui/react";
import { MIN_RANGE_BETWEEN_THUMB, currencyVND } from "../../utils";
import { FilterProps } from "../../interfaces";
import ReactSlider from "react-slider";
import "./style.css";

const Filter = ({ max, priceRange, onHandleChangePriceRange }: FilterProps) => {
  return (
    <Flex
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <ReactSlider
        className="horizontal-slider"
        thumbClassName="example-thumb"
        trackClassName="example-track"
        min={0}
        max={max}
        defaultValue={[0, max]}
        ariaLabel={["Lower thumb", "Upper thumb"]}
        ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
        pearling
        minDistance={MIN_RANGE_BETWEEN_THUMB}
        onAfterChange={(value) =>
          onHandleChangePriceRange({ min: value[0], max: value[1] })
        }
      />
      <Text fontSize={"20px"} fontWeight={400}>
        {currencyVND(String(priceRange.min))} -{" "}
        {currencyVND(String(Number(priceRange.max) ? priceRange.max : max))}
      </Text>
    </Flex>
  );
};

export default Filter;
