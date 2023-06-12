import { Container } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

const MainLayuot = () => {
  return (
    <Container maxW={1440}>
      <Outlet />
      <Footer />
    </Container>
  );
};

export default MainLayuot;
