import Logo from "../Logo/Logo";
import Nav from "../Nav/Nav";
import { Badge, Box, Flex, Spacer } from "@chakra-ui/react";
import { Icon } from "@chakra-ui/icons";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from "react-router-dom";

const header = [
  { name: "home", path: "/" },
  { name: "product", path: "/product" },
  { name: "about us", path: "/aboutus" },
  { name: "contact", path: "/contact" },
];

const Header = ({ size = 0 }) => {
  return (
    <Box p={3} position={"sticky"}>
      <Flex justifyContent={"center"} alignItems={"center"}>
        <Logo />
        <Spacer />
        <Nav data={header} />
        <Spacer />
        <Box>
          <Link to={"shopping-cart"}>
            <Icon as={AiOutlineShoppingCart} boxSize={7} />
            <Badge colorScheme="red" pos={"relative"} top={-5}>
              {size}
            </Badge>
          </Link>
        </Box>
      </Flex>
    </Box>
  );
};

export default Header;
