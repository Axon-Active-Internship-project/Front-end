import { Text } from "@chakra-ui/react";
import React, { useState } from "react";

const ReadMore = ({ children }: { children: React.ReactNode }) => {
  console.log(children);

  const text = children;

  console.log("text =>", text);

  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <Text
      fontSize={20}
      textTransform={"capitalize"}
      noOfLines={isReadMore ? 5 : undefined}
    >
      {children}
      <span onClick={toggleReadMore}>
        {isReadMore ? "...read more" : " show less"}
      </span>
    </Text>
  );
};

export default ReadMore;
