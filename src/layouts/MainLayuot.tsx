import { Container } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

const MainLayuot = () => {
  return (
    <Container maxW={1440}>
      <Outlet />
    </Container>
  );
};

export default MainLayuot;
