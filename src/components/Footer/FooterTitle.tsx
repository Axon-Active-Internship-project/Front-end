import { Text } from "@chakra-ui/react";

const FooterTitle = ({ title = "" }) => {
  return (
    <Text
      fontWeight={"700"}
      fontSize={26}
      textTransform={"capitalize"}
      fontFamily={"Cormorant"}
    >
      {title}
    </Text>
  );
};

export default FooterTitle;
