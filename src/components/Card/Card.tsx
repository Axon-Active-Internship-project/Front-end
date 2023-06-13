import {
  Box,
  Card,
  CardBody,
  Heading,
  Image,
  Text,
  HStack,
} from "@chakra-ui/react";
import IProduct from "../../interfaces/product";

const MyCard = ({ ...data }: IProduct) => {
  const { name, price, sale_price, src } = data;
  return (
    <Card w={330} h={355}>
      <CardBody>
        <Image
          w={"100%"}
          h={"300"}
          src={
            "https://s1.storage.5giay.vn/image/2016/10/20161021_b84b6337cc54488264598cf7e498eeff_1477033027.jpg"
          }
        />
        <Box>
          <Heading>{name}</Heading>
          <Box>
            {!sale_price ? (
              <Text>{price} đ</Text>
            ) : (
              <HStack spacing={10}>
                <Text>{sale_price} đ</Text>
                <Text as="s">{price} đ</Text>
              </HStack>
            )}
          </Box>
        </Box>
      </CardBody>
    </Card>
  );
};

export default MyCard;
