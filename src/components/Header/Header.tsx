import "./style.scss";
import Logo from "../Logo/Logo";
import Nav from "../Nav/Nav";
import { Flex, Spacer } from "@chakra-ui/react";

const data = [
  { name: "home", path: "/" },
  { name: "product", path: "/product" },
  { name: "about us", path: "/aboutus" },
  { name: "contact", path: "/contact" },
];

const Header = () => {
  return (
    <Flex>
      <div className="logo">
        <Logo />
      </div>
      <Spacer />
      <Nav data={data} />
      <Spacer />
    </Flex>
  );
};

export default Header;
