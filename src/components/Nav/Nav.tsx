import { Box, Flex, Text } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
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
  const location = useLocation();

  return (
    <Link to={path}>
      <Text
        fontFamily={"lekton"}
        fontWeight={700}
        textAlign={"center"}
        textTransform={"capitalize"}
        fontSize={27}
        color={location.pathname === path ? "" : "rgba(0, 0, 0, 0.5)"}
      >
        {name}
      </Text>
    </Link>
  );
};

export default Nav;

NavItem.propTypes = {
  name: PropTypes.string,
  path: PropTypes.string,
};

Nav.propTypes = {
  data: PropTypes.array,
};
