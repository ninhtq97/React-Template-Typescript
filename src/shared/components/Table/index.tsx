import { FC } from 'react';
import { Metadata } from 'shared/@types/pagination';
import Pagination from 'shared/components/Pagination';
import PlaceholderLoading from '../Loading/Placeholder';
import {
  Cell,
  Row,
  StyledTable,
  TableBody,
  TableContainer,
  TableHead,
} from './Styles';

type TableProps = {
  columns?: any[];
  meta: Metadata;
  loading: boolean;
  onPageChange: Function;
};

const Table: FC<TableProps> = ({
  columns,
  meta,
  loading,
  onPageChange,
  children,
}) => {
  return (
    <StyledTable>
      <TableContainer>
        {columns && (
          <TableHead>
            <Row.Head>
              {columns.map((column, i) => (
                <Cell.Head key={i}>{column}</Cell.Head>
              ))}
            </Row.Head>
          </TableHead>
        )}
        <TableBody>{children}</TableBody>
      </TableContainer>

      {meta?.pageCount > 1 && (
        <Pagination
          currentPage={meta.page}
          totalPage={meta.pageCount}
          onPageChange={onPageChange}
        />
      )}

      {loading && <PlaceholderLoading />}
    </StyledTable>
  );
};

export default Table;
