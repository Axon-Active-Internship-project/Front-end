import { Container } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <Container maxW={1440}>
      <Header />
      <Outlet />
      <Footer />
    </Container>
  );
};

export default MainLayout;
