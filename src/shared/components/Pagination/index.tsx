import { FC } from 'react';
import { pageNumber } from 'shared/constants/common';
import PaginationItem from './Item';
import {
  PaginationNext,
  PaginationNextIcon,
  PaginationPrevious,
  PaginationPreviousIcon,
  StyledPagination,
} from './Styles';

type Props = {
  currentPage: number;
  totalPage: number;
  onPageChange: Function;
};

const Pagination: FC<Props> = ({ currentPage, totalPage, onPageChange }) => {
  const pageNumbers: number[] = [];

  for (let i = 1; i <= totalPage; i++) {
    pageNumbers.push(i);
  }

  const goToFirstPage = () => {
    onPageChange({ page: pageNumber });
  };

  const goToPage = (number: number) => {
    onPageChange({ page: number });
  };

  const goToLastPage = () => {
    onPageChange({ page: totalPage });
  };

  return (
    <StyledPagination>
      {currentPage > 1 && (
        <PaginationPrevious onClick={goToFirstPage}>
          <PaginationPreviousIcon size={16} />
        </PaginationPrevious>
      )}
      {pageNumbers.map((number) => {
        if (number <= currentPage + 2 && number >= currentPage - 2) {
          return (
            <PaginationItem
              key={number}
              current={currentPage}
              number={number}
              goToPage={() => goToPage(number)}
            />
          );
        }
        return null;
      })}
      {totalPage > 0 && currentPage !== totalPage && (
        <PaginationNext onClick={goToLastPage}>
          <PaginationNextIcon size={16} />
        </PaginationNext>
      )}
    </StyledPagination>
  );
};

export default Pagination;
