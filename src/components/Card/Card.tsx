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
import { currencyVND } from "../../utils";

const MyCard = ({ data }: CardProps) => {
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  const { id, name, price, sale_price, src } = data;
  return (
    <Card
      maxW="sm"
      maxH={"sm"}
      variant={"outline"}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <Link to={`/product/${id}`}>
        <CardBody padding={1}>
          <Image
            w={"100%"}
            h={"300"}
            src={src}
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
                >
                  {currencyVND(price)}
                </Text>
              ) : (
                <HStack spacing={5}>
                  <Text
                    fontSize={16}
                    textTransform={"capitalize"}
                    fontWeight={400}
                    fontStyle={"normal"}
                  >
                    {currencyVND(sale_price)}
                  </Text>
                  <Text
                    as="s"
                    fontSize={16}
                    textTransform={"capitalize"}
                    fontWeight={400}
                    fontStyle={"normal"}
                  >
                    {currencyVND(price)}
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
