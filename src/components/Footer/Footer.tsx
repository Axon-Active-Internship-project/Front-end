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
import { FaTwitter, FaFacebookF, FaInstagram } from "react-icons/fa";
const data1: FooterGroupPros = {
  title: "Customer Service",
  item: ["Blog", "Track Your Animal", "Payment Options"],
};

const data2: FooterGroupPros = {
  title: "Navigation",
  item: ["Home", "About Us", "Contact Us", "FAQs", "Help with navigation"],
};

const data3 = [FaFacebookF, FaInstagram, FaTwitter];

const Footer = () => {
  return (
    <Box>
      <Flex>
        <Box>
          <FooterGroup title={data1.title} item={data1.item} />
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
                {data3.map((icon, index) => (
                  <FooterIcon key={index} icon={icon} />
                ))}
              </HStack>
            </Flex>
          </Flex>
        </Box>
        <Spacer />
        <Box>
          <FooterGroup title={data2.title} item={data2.item} />
        </Box>
      </Flex>
      <Box></Box>
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

const FooterItem = ({ text = "" }) => {
  return (
    <Text fontWeight={"400"} fontSize={18} textTransform={"capitalize"}>
      {text}
    </Text>
  );
};

const FooterGroup = ({ title, item }: FooterGroupPros) => {
  return (
    <Flex flexDirection={"column"} gap={18}>
      <FooterTitle title={title} />
      {item.map((item, index) => (
        <FooterItem key={index} text={item} />
      ))}
    </Flex>
  );
};

interface FooterGroupPros {
  title: string;
  item: string[];
}

const FooterIcon = ({ icon }: any) => {
  return <Icon as={icon} boxSize={8} />;
};
