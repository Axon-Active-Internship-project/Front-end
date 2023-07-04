import { Link } from "react-router-dom";
import { FooterItemProps } from "../../interfaces";
import { Text } from "@chakra-ui/react";

const FooterItem = ({ text, path }: FooterItemProps) => {
  return (
    <Link to={path}>
      <Text
        fontWeight={"400"}
        fontSize={23}
        textTransform={"capitalize"}
        fontFamily={"Cormorant"}
      >
        {text}
      </Text>
    </Link>
  );
};

export default FooterItem;
