import { Link } from "react-router-dom";
import { FooterIconProps } from "../../interfaces";
import { Icon } from "@chakra-ui/react";

const FooterIcon = ({ icon, path }: FooterIconProps) => {
  return (
    <Link to={path}>
      <Icon as={icon} boxSize={8} color={"#E89B93"} />
    </Link>
  );
};

export default FooterIcon;
