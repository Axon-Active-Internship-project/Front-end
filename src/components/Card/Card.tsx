import {
  Box,
  Card,
  CardBody,
  Heading,
  Image,
  Text,
  HStack,
  Button,
  Flex,
  Icon,
} from "@chakra-ui/react";
import { CardProps } from "../../interfaces/product";
import { FaCartPlus, FaPlus } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";

const MyCard = ({ data }: CardProps) => {
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  const { name, price, sale_price, src } = data;
  return (
    <Card
      maxW={330}
      maxH={355}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <Link to={"/"}>
        <CardBody padding={1}>
          <Image
            w={"100%"}
            h={"300"}
            src={src}
            borderRadius={10}
            objectFit={"fill"}
            opacity={isHovering ? 0.5 : 1}
          />
          <Box mx={4} pt={1}>
            <Heading as={"h5"} size={"md"} textTransform={"capitalize"}>
              {name}
            </Heading>
            <Box>
              {!sale_price ? (
                <Text>{price} đ</Text>
              ) : (
                <HStack spacing={5}>
                  <Text>{sale_price} đ</Text>
                  <Text as="s">{price} đ</Text>
                </HStack>
              )}
            </Box>
          </Box>
        </CardBody>
      </Link>
      {isHovering && (
        <Flex
          gap={5}
          justifyContent={"center"}
          pos={"absolute"}
          bottom={55}
          right={0}
          left={0}
        >
          <Button colorScheme="yellow">
            <Icon as={FaPlus} boxSize={"5"} />
          </Button>
          <Button colorScheme="green">
            <Icon as={FaCartPlus} boxSize={"5"} />
          </Button>
        </Flex>
      )}
    </Card>
  );
};

export default MyCard;
