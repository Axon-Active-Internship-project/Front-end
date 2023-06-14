import { Box, Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { NavItemProps, NavProps } from "../../interfaces";
import PropTypes from "prop-types";

const Nav = ({ data }: NavProps) => {
  return (
    <Box>
      <Flex gap={120} alignItems={"center"} justifyContent={"center"}>
        {data.map((item: NavItemProps, index: number) => {
          return <NavItem key={index} {...item} />;
        })}
      </Flex>
    </Box>
  );
};

const NavItem = ({ name, path }: NavItemProps) => {
  return (
    <Link to={path}>
      <Text
        fontWeight={400}
        textAlign={"center"}
        textTransform={"capitalize"}
        fontSize={18}
        color={"black"}
      >
        {name}
      </Text>
    </Link>
  );
};

export default Nav;

NavItem.PropTypes = {
  name: PropTypes.string,
  path: PropTypes.string,
};

Nav.PropTypes = {
  data: PropTypes.string,
};
