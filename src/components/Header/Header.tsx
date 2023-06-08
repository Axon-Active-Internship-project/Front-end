import React from "react";
import "./style.scss";
import Logo from "../Logo/Logo";
import { List } from "@chakra-ui/react";

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <Logo />
      </div>
      <List >
        
      </List>
    </header>
  );
};

export default Header;
