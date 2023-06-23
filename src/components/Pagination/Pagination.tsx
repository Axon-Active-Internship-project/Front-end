import { DOTS, usePagnation } from "../../hooks";
import { Box, Button, Flex, Icon, IconButton } from "@chakra-ui/react";
import { FaEllipsisH, FaAngleRight, FaAngleLeft } from "react-icons/fa";
import { PaginationProps } from "../../interfaces";

const Pagination = ({
  onPageChange,
  siblingCount = 1,
  currentPage,
  totalPageCount,
}: PaginationProps) => {
  const paginationRange = usePagnation({
    currentPage,
    siblingCount,
    totalPageCount,
  });

  if (currentPage === 0 || paginationRange?.length < 2) {
    return null;
  }

  const onClickNext = () => {
    onPageChange((page: number) => page + 1);
  };

  const onClickPrevious = () => {
    onPageChange((page: number) => page - 1);
  };

  let lastPage = paginationRange[paginationRange?.length - 1];

  return (
    <Flex mt={"9"} gap={1} justifyContent={"center"}>
      <Button
        onClick={onClickPrevious}
        isDisabled={currentPage === 1}
        size={"sm"}
        p={0}
      >
        <Icon as={FaAngleLeft} />
      </Button>
      <Box>
        {paginationRange?.map((pageNumber: number | string, index: number) => {
          if (pageNumber === DOTS) {
            return (
              <IconButton
                key={index}
                aria-label="DOTS"
                icon={<FaEllipsisH />}
                colorScheme="blackAlpha"
                variant="outline"
                color={"black"}
                size={"sm"}
                p={0}
              />
            );
          }
          return (
            <Button
              key={index}
              colorScheme="blackAlpha"
              variant="outline"
              color={pageNumber === currentPage ? "blue" : "black"}
              isActive={pageNumber === currentPage}
              onClick={() => onPageChange(pageNumber)}
              mx={"4px"}
              size={"sm"}
              p={0}
            >
              {pageNumber}
            </Button>
          );
        })}
      </Box>
      <Button
        isDisabled={currentPage === lastPage}
        onClick={onClickNext}
        size={"sm"}
        p={0}
      >
        <Icon as={FaAngleRight} />
      </Button>
    </Flex>
  );
};

export default Pagination;
