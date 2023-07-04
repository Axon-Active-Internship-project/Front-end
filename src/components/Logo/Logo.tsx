import { Box, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to={"/"}>
      <Box>
        <Image
          src="https://redq.io/landing/_next/static/images/logo-61583e555188bd341d42dac2c04389aa.svg"
          boxSize={85}
          objectFit="contain"
          alt="Logo"
        />
      </Box>
    </Link>
  );
};

export default Logo;
