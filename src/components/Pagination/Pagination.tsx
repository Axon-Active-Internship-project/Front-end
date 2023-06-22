import { DOTS, usePagnation } from "../../hooks";
import { Box, Button, Flex, Icon, IconButton } from "@chakra-ui/react";
import { FaEllipsisH, FaAngleRight, FaAngleLeft } from "react-icons/fa";
import { PaginationProps } from "../../interfaces";

const Pagination = ({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
}: PaginationProps) => {
  const paginationRange = usePagnation({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
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
    <Flex mt={"9"} gap={4} justifyContent={"center"}>
      <Button onClick={onClickPrevious} isDisabled={currentPage === 1}>
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
            >
              {pageNumber}
            </Button>
          );
        })}
      </Box>
      <Button isDisabled={currentPage === lastPage} onClick={onClickNext}>
        <Icon as={FaAngleRight} />
      </Button>
    </Flex>
  );
};

export default Pagination;
