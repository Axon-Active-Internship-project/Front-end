import { Box, List, ListItem } from "@chakra-ui/react";
import React from "react";

const Nav = ({ data: [] }) => {
  return (
    <Box>
      <List>{/* {data.} */}</List>
    </Box>
  );
};

const NavItem = ({ item }: any) => {
  return <ListItem>{item}</ListItem>;
};

export default Nav;
