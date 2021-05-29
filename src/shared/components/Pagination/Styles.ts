import { ArrowLeftShort, ArrowRightShort } from '@styled-icons/bootstrap';
import color from 'shared/styles/color';
import styled from 'styled-components';

export const StyledPagination = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-top: 24px;
`;

export const StyledPaginationItem = styled.div<Record<string, any>>`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${(props) => (props.active ? color.success : '#e2e5ef')};
  border-radius: 4px;
  background: ${(props) => (props.active ? color.success : color.white)};
  width: 36px;
  height: 36px;
  font-size: 16px;
  color: ${(props) => (props.active ? color.white : '#4f586c')};
  cursor: ${(props) => (props.active ? 'default' : 'pointer')};
  pointer-events: ${(props) => (props.active ? 'none' : 'auto')};
  margin: 0 4px;
`;

export const PaginationPrevious = styled(StyledPaginationItem)``;

export const PaginationPreviousIcon = styled(ArrowLeftShort)``;

export const PaginationDot = styled(StyledPaginationItem)`
  pointer-events: none;
`;

export const PaginationNext = styled(StyledPaginationItem)``;

export const PaginationNextIcon = styled(ArrowRightShort)``;
