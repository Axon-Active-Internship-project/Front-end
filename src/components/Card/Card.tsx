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
} from "@chakra-ui/react";
import { CardProps } from "../../interfaces/product";
import { useState } from "react";
import { Link } from "react-router-dom";
import { NO_IMAGE, addToCart, currencyVND } from "../../utils";

const MyCard = ({ data }: CardProps) => {
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  const { id, name, regular_price, sale_price, images } = data;

  return (
    <Card
      maxW="sm"
      maxH={"sm"}
      w={"330px"}
      h={"355px"}
      p={0}
      variant={"outline"}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <Link to={`/product/${id}`}>
        <CardBody padding={1}>
          <Image
            w={"100%"}
            h={"300"}
            src={images[0]?.src || NO_IMAGE}
            borderRadius={10}
            objectFit={"fill"}
            opacity={isHovering ? 0.3 : 1}
          />
          <Box mx={4} pt={1}>
            <Heading
              as={"h5"}
              size={"md"}
              textTransform={"capitalize"}
              fontFamily={"lekton"}
              fontSize={20}
              fontWeight={600}
              isTruncated
            >
              {name}
            </Heading>
            <Box>
              {!sale_price ? (
                <Text
                  fontSize={16}
                  textTransform={"capitalize"}
                  fontWeight={400}
                  fontStyle={"normal"}
                  isTruncated
                >
                  {currencyVND(regular_price)}
                </Text>
              ) : (
                <HStack spacing={5}>
                  <Text
                    fontSize={16}
                    textTransform={"capitalize"}
                    fontWeight={400}
                    fontStyle={"normal"}
                    isTruncated
                  >
                    {currencyVND(sale_price)}
                  </Text>
                  <Text
                    as="s"
                    fontSize={16}
                    textTransform={"capitalize"}
                    fontWeight={400}
                    fontStyle={"normal"}
                    isTruncated
                  >
                    {currencyVND(regular_price)}
                  </Text>
                </HStack>
              )}
            </Box>
          </Box>
        </CardBody>
      </Link>
      {isHovering && (
        <Flex
          gap={5}
          justifyContent={"flex-end"}
          pos={"absolute"}
          bottom={55}
          right={0}
          left={0}
          padding={"12px"}
        >
          <Button colorScheme="yellow">Buy now</Button>
          <Button
            colorScheme="green"
            onClick={() =>
              addToCart({
                ...data,
                quantity: 1,
                image: images?.[0]?.src || NO_IMAGE,
              })
            }
          >
            Add to cart
          </Button>
        </Flex>
      )}
    </Card>
  );
};

export default MyCard;
