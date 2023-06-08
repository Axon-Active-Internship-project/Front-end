import { FC, ReactNode } from "react";
import { Container } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";

interface BaseLayoutProps {
  children?: ReactNode;
}

const MainLayuot: FC<BaseLayoutProps> = () => {
  return (
    <Container maxW={1440}>
      <Header />
      <Outlet />
    </Container>
  );
};

export default MainLayuot;
