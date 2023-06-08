import { Box, Flex, Spacer, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

interface NavItemProps {
  name: string;
  path: string;
}

const Nav = ({ data }: any) => {
  return (
    <Box>
      <Flex gap={150} alignItems={"center"} justifyContent={"center"}>
        {data.map((item: NavItemProps, index: number) => {
          const { name, path } = item;
          return <NavItem key={index} name={name} path={path} />;
        })}
      </Flex>
    </Box>
  );
};

const NavItem = ({ name, path }: NavItemProps) => {
  return (
    <Link to={path}>
      <Text textAlign={"center"} textTransform={"capitalize"} fontSize={18}>
        {name}
      </Text>
    </Link>
  );
};

export default Nav;
