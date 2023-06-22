export interface UsePaginationProps {
  totalPageCount: number;
  siblingCount?: number;
  currentPage: number;
}

export interface PaginationProps {
  onPageChange: any;
  siblingCount?: number;
  currentPage: number;
  totalPageCount: number;
}
