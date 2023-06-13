import { Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { Box, Container, Flex } from "@chakra-ui/layout";
import { useNavigate } from "react-router";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container maxW={1440} h={"100vh"}>
      <Box width={"100%"} height={"100%"}>
        <Image
          src="https://www.pngitem.com/pimgs/m/561-5616833_image-not-found-png-not-found-404-png.png"
          width={"100%"}
          height={"100%"}
          objectFit={"contain"}
        />
        <Box pos={"relative"} top={-500}>
          <Flex gap={10} flexDirection={"column"} alignItems={"center"}>
            <Button
              variant={"solid"}
              color={"white"}
              colorScheme="messenger"
              onClick={() => navigate("/")}
              maxW={140}
            >
              Back Home
            </Button>
          </Flex>
        </Box>
      </Box>
    </Container>
  );
};

export default NotFound;
