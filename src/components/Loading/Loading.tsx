import { Flex } from "@chakra-ui/react";
import ClipLoader from "react-spinners/ClipLoader";

const Loading = () => {
  return (
    <Flex
      justifyContent={"center"}
      alignItems={"center"}
      w={"100%"}
      minH={"51.8vh"}
    >
      <ClipLoader
        loading={true}
        size={100}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </Flex>
  );
};

export default Loading;
