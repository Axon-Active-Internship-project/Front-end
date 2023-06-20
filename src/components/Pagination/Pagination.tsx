import { DOTS, usePagnation } from "../../hooks";
import { Box, Button, IconButton } from "@chakra-ui/react";
import { FaEllipsisH } from "react-icons/fa";
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
    <Box>
      <Button onClick={onClickPrevious}>Previous</Button>
      {paginationRange?.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return (
            <IconButton
              key={index}
              colorScheme="blue"
              aria-label="Search database"
              icon={<FaEllipsisH />}
            />
          );
        }
        return (
          <Button
            key={index}
            isActive={pageNumber === currentPage}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </Button>
        );
      })}
      <Button isDisabled={currentPage === lastPage} onClick={onClickNext}>
        Next
      </Button>
    </Box>
  );
};

export default Pagination;
