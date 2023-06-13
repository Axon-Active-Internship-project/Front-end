import { Box, Heading, Text } from "@chakra-ui/layout";
import { useRouteError } from "react-router";

const Error = () => {
  const error: any = useRouteError();
  return (
    <Box>
      <Heading as={"h1"} size={"4xl"}>
        Oops!
      </Heading>
      <Text>Sorry, an unexpected error has occurred.</Text>
      <Text>{error?.statusTexts || error?.message}</Text>
    </Box>
  );
};

export default Error;
