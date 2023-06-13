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
const footerLeft: FooterGroupPros = {
  title: "Customer Service",
  item: [
    { text: "Blog", path: "/" },
    { text: "Payment Options", path: "/" },
    { text: "Cancellations", path: "/" },
    { text: "Track Your Animal", path: "/" },
  ],
};

const footerRight: FooterGroupPros = {
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

interface FooterGroupPros {
  title: string;
  item: FooterItemPros[];
}

interface FooterItemPros {
  text: string;
  path: string;
}

interface FooterIconPros {
  icon: any;
  path: string;
}

const Footer = () => {
  return (
    <Box>
      <Flex>
        <Box>
          <FooterGroup title={footerLeft.title} item={footerLeft.item} />
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
                  const { icon, path } = item;
                  return <FooterIcon key={index} icon={icon} path={path} />;
                })}
              </HStack>
            </Flex>
          </Flex>
        </Box>
        <Spacer />
        <Box>
          <FooterGroup title={footerRight.title} item={footerRight.item} />
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

const FooterItem = ({ text, path }: FooterItemPros) => {
  return (
    <Link to={path}>
      <Text fontWeight={"400"} fontSize={18} textTransform={"capitalize"}>
        {text}
      </Text>
    </Link>
  );
};

const FooterGroup = ({ title, item }: FooterGroupPros) => {
  return (
    <Flex flexDirection={"column"} gap={18}>
      <FooterTitle title={title} />
      {item.map((item, index) => {
        const { text, path } = item;
        return <FooterItem key={index} text={text} path={path} />;
      })}
    </Flex>
  );
};

const FooterIcon = ({ icon, path }: FooterIconPros) => {
  return (
    <Link to={path}>
      <Icon as={icon} boxSize={8} color={"#E89B93"} />
    </Link>
  );
};
