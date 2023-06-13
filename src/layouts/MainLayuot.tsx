import { Container } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const MainLayuot = () => {
  return (
    <Container maxW={1440}>
      <Header />
      <Outlet />
    </Container>
  );
};

export default MainLayuot;
