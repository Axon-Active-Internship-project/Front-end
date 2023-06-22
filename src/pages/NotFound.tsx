import { Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { Box, Container, Flex } from "@chakra-ui/layout";
import { useNavigate } from "react-router";
import { NOT_FOUND_IMAGE } from "../utils";

const NotFound = () => {
  const navigate = useNavigate();

  const handleClickBackHome = () => {
    navigate("..");
  };

  return (
    <Container maxW={1440} h={"100vh"}>
      <Box width={"100%"} height={"100%"} pos={"relative"}>
        <Image
          src={NOT_FOUND_IMAGE}
          alt="Not found"
          width={"100%"}
          height={"100%"}
          objectFit={"contain"}
        />
        <Flex
          pos={"absolute"}
          left={0}
          right={0}
          bottom={500}
          justifyContent={"center"}
        >
          <Button
            variant={"solid"}
            color={"white"}
            colorScheme="messenger"
            onClick={handleClickBackHome}
            maxW={140}
          >
            Back Home
          </Button>
        </Flex>
      </Box>
    </Container>
  );
};

export default NotFound;
