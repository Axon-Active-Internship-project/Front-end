import {
  Box,
  Button,
  Flex,
  HStack,
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
import { FooterGroupProps } from "../../interfaces";
import FooterIcon from "./FooterIcon";
import FooterGroup from "./FooterGroup";

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

const CookiesSettingTitle = "Cookie Policy";
const CookiesPolicyTitle = "Cookies Settings";
const CopyRightTitle =
  "Copyright 2021 Luxe Animal Spa, LLC. All rights reserved.";
const TermstTitle = "Terms";
const PrivacyTitle = "Privacy";
const SecurityTitle = "Security";

const Footer = () => {
  return (
    <Box mt={12}>
      <Flex mb={"75px"}>
        <Box>
          <FooterGroup {...footerLeft} />
        </Box>
        <Spacer />
        <Box>
          <Flex flexDirection={"column"} gap={4}>
            <Text fontSize={"26"} fontWeight={"700"} fontFamily={"Cormorant"}>
              Subscribe to our Newsletter
            </Text>
            <Spacer />
            <HStack spacing={8} mb={"40px"}>
              <Input
                placeholder="Email"
                size={"lg"}
                fontFamily={"Cormorant"}
                fontWeight={400}
                fontSize={"14px"}
              />
              <Button
                size="lg"
                backgroundColor={"black"}
                color={"white"}
                margin={4}
                textTransform={"capitalize"}
                fontFamily={"Cormorant"}
                fontWeight={700}
                fontSize={"20px"}
              >
                subscribe
              </Button>
            </HStack>
            <Flex flexDirection={"column"} gap={8}>
              <Text
                fontSize={"26"}
                fontWeight={700}
                fontFamily={"Cormorant"}
                color={"#4C4C4B"}
              >
                Connect With Us On Social Media
              </Text>
              <HStack spacing={8} justifyContent={"flex-start"}>
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
        h={"52px"}
        background={"#D3D3D3"}
        mt={18}
      >
        <Text
          fontSize={22}
          fontWeight={400}
          color={"#4C4C4B"}
          fontFamily={"Cormorant"}
        >
          {CookiesPolicyTitle}
        </Text>
        <Text
          fontSize={22}
          fontWeight={400}
          color={"#4C4C4B"}
          fontFamily={"Cormorant"}
        >
          {CookiesSettingTitle}
        </Text>
        <Text
          fontSize={22}
          fontWeight={400}
          color={"#4C4C4B"}
          fontFamily={"Cormorant"}
        >
          {CopyRightTitle}
        </Text>
        <Text
          fontSize={22}
          fontWeight={400}
          color={"#4C4C4B"}
          fontFamily={"Cormorant"}
        >
          {TermstTitle}
        </Text>
        <Text
          fontSize={22}
          fontWeight={400}
          color={"#4C4C4B"}
          fontFamily={"Cormorant"}
        >
          {PrivacyTitle}
        </Text>
        <Text
          fontSize={22}
          fontWeight={400}
          color={"#4C4C4B"}
          fontFamily={"Cormorant"}
        >
          {SecurityTitle}
        </Text>
      </Flex>
    </Box>
  );
};

export default Footer;
