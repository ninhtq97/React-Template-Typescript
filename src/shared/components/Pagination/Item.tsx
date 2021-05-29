import { StyledPaginationItem } from './Styles';

const PaginationItem = ({ current, number, goToPage }) => {
  return (
    <StyledPaginationItem active={current === number} onClick={goToPage}>
      {number}
    </StyledPaginationItem>
  );
};

export default PaginationItem;
