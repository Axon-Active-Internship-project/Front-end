import {
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  Input,
  Spacer,
  Text,
} from "@chakra-ui/react";
import {
  FaTwitter,
  FaFacebookF,
  FaInstagram,
  FaPinterestP,
  FaSnapchatGhost,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  FooterGroupProps,
  FooterIconProps,
  FooterItemProps,
} from "../../interfaces";

const footerLeft: FooterGroupProps = {
  title: "Customer Service",
  item: [
    { text: "Blog", path: "/" },
    { text: "Payment Options", path: "/" },
    { text: "Cancellations", path: "/" },
    { text: "Track Your Animal", path: "/" },
  ],
};

const footerRight: FooterGroupProps = {
  title: "Navigation",
  item: [
    { text: "Home", path: "/" },
    { text: "About Us", path: "/" },
    { text: "Contact Us", path: "/" },
    { text: "FAQs", path: "/" },
    { text: "Help with navigation", path: "/" },
  ],
};

const footerIcon = [
  { icon: FaFacebookF, path: "/" },
  { icon: FaInstagram, path: "/" },
  { icon: FaPinterestP, path: "/" },
  { icon: FaTwitter, path: "/" },
  { icon: FaSnapchatGhost, path: "/" },
];

const Footer = () => {
  return (
    <Box>
      <Flex>
        <Box>
          <FooterGroup {...footerLeft} />
        </Box>
        <Spacer />
        <Box>
          <Flex flexDirection={"column"} gap={4}>
            <Text fontSize={"22"} fontWeight={"bold"}>
              Subscribe to our Newsletter
            </Text>
            <Spacer />
            <HStack spacing={8}>
              <Input placeholder="Email" size={"lg"} />
              <Button
                size="lg"
                backgroundColor={"black"}
                color={"white"}
                margin={4}
                textTransform={"capitalize"}
              >
                subscribe
              </Button>
            </HStack>
            <Flex flexDirection={"column"} gap={5}>
              <Text fontSize={"22"} fontWeight={"bold"}>
                Connect With Us On Social Media
              </Text>
              <HStack spacing={8} justifyContent={"center"}>
                {footerIcon.map((item, index) => {
                  return <FooterIcon key={index} {...item} />;
                })}
              </HStack>
            </Flex>
          </Flex>
        </Box>
        <Spacer />
        <Box>
          <FooterGroup {...footerRight} />
        </Box>
      </Flex>
      <Flex
        justifyContent={"space-evenly"}
        alignItems={"center"}
        h={45}
        background={"#D3D3D3"}
        mt={18}
      >
        <Text fontSize={18} fontWeight={"450"} color={"#4C4C4B"}>
          Cookie Policy
        </Text>
        <Text fontSize={18} fontWeight={"450"} color={"#4C4C4B"}>
          Cookies Settings
        </Text>
        <Text fontSize={18} fontWeight={"450"} color={"#4C4C4B"}>
          Copyright 2021 Luxe Animal Spa, LLC. All rights reserved.
        </Text>
        <Text fontSize={18} fontWeight={"450"} color={"#4C4C4B"}>
          Terms
        </Text>
        <Text fontSize={18} fontWeight={"450"} color={"#4C4C4B"}>
          Privacy
        </Text>
        <Text fontSize={18} fontWeight={"450"} color={"#4C4C4B"}>
          Security
        </Text>
      </Flex>
    </Box>
  );
};

export default Footer;

const FooterTitle = ({ title = "" }) => {
  return (
    <Text fontWeight={"bold"} fontSize={22} textTransform={"capitalize"}>
      {title}
    </Text>
  );
};

const FooterItem = ({ text, path }: FooterItemProps) => {
  return (
    <Link to={path}>
      <Text fontWeight={"400"} fontSize={18} textTransform={"capitalize"}>
        {text}
      </Text>
    </Link>
  );
};

const FooterGroup = ({ title, item }: FooterGroupProps) => {
  return (
    <Flex flexDirection={"column"} gap={18}>
      <FooterTitle title={title} />
      {item.map((item, index) => {
        return <FooterItem key={index} {...item} />;
      })}
    </Flex>
  );
};

const FooterIcon = ({ icon, path }: FooterIconProps) => {
  return (
    <Link to={path}>
      <Icon as={icon} boxSize={8} color={"#E89B93"} />
    </Link>
  );
};
