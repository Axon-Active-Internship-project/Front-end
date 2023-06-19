import { Flex } from "@chakra-ui/react";
import { FooterGroupProps } from "../../interfaces";
import FooterItem from "./FooterItem";
import FooterTitle from "./FooterTitle";

const FooterGroup = ({ title, item }: FooterGroupProps) => {
  return (
    <Flex flexDirection={"column"} gap={18} minW={180}>
      <FooterTitle title={title} />
      {item.map((item, index) => {
        return <FooterItem key={index} {...item} />;
      })}
    </Flex>
  );
};

export default FooterGroup;
