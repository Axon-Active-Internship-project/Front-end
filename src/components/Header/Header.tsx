import Logo from "../Logo/Logo";
import Nav from "../Nav/Nav";
import { Badge, Box, Flex, Spacer } from "@chakra-ui/react";
import { Icon } from "@chakra-ui/icons";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useMemo } from "react";
import { getSessionItems } from "../../utils";

const data = [
  { name: "home", path: "/" },
  { name: "product", path: "/products" },
  { name: "about us", path: "/aboutus" },
  { name: "contact", path: "/contact" },
];

const Header = () => {
  const size = useMemo(() => {
    const sessionItems = getSessionItems();
    return sessionItems.length;
  }, [sessionStorage]);

  return (
    <Box p={3} position={"sticky"} mb={"24px"} w={"100%"} zIndex={100}>
      <Flex justifyContent={"center"} alignItems={"center"}>
        <Logo />
        <Spacer />
        <Nav data={data} />
        <Spacer />
        <Box pos={"relative"}>
          <Link to={"shopping-cart"}>
            <Icon as={AiOutlineShoppingCart} boxSize={7} />
            <Badge
              colorScheme="red"
              background={"#FB7844"}
              pos={"absolute"}
              top={-2}
              left={5}
              borderRadius={"99px"}
            >
              {size}
            </Badge>
          </Link>
        </Box>
      </Flex>
    </Box>
  );
};

export default Header;
