import Logo from "../Logo/Logo";
import Nav from "../Nav/Nav";
import { Badge, Box, Flex, Spacer } from "@chakra-ui/react";
import { Icon } from "@chakra-ui/icons";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLocalStorage } from "../../hooks";
import { CART } from "../../utils";

const data = [
  { name: "home", path: "/" },
  { name: "product", path: "/products" },
  { name: "about us", path: "/aboutus" },
  { name: "contact", path: "/contact" },
];

const Header = () => {
  const [size, setSize] = useState<number>(0);

  const { value } = useLocalStorage(CART.KEY_WORD);

  const onHandleLocalStorageChange = (e: CustomEvent) => {
    setSize(() => JSON.parse(e?.detail.newValue).length);
  };

  useEffect(() => {
    setSize(() => value?.length || 0);
    window.addEventListener(
      "storageEvent",
      (e) => onHandleLocalStorageChange(e),
      false
    );

    return () => {
      window.removeEventListener("storageEvent", (e) =>
        onHandleLocalStorageChange(e)
      );
    };
  }, []);

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
