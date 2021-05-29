import color from 'shared/styles/color';
import { LinkElement, TableElement } from 'shared/styles/tag';
import styled from 'styled-components';

export const StyledTable = styled.div``;

export const TableContainer = styled(TableElement)`
  border-collapse: separate;
  border-spacing: 0 4px;
`;

export const TableHead = styled.thead``;

export const TableBody = styled.tbody``;

export const Cell = {
  Head: styled.th`
    padding: 5px 12px 15px;
    font-weight: normal;
    white-space: nowrap;
    text-align: center;
  `,
  Body: styled.td`
    border-left: 0;
    border-right: 0;
    height: 44px;
    background-color: rgba(255, 255, 255, 0.55);
    backdrop-filter: blur(24px);
    vertical-align: middle;
    text-align: center;
    padding: 0 6px;
    position: relative;
    white-space: nowrap;
  `,
};

export const Row = {
  Head: styled.tr``,
  Body: styled.tr<Record<string, any>>`
    border-radius: 2px;
    overflow: hidden;
    cursor: pointer;

    ${Cell.Body} {
      z-index: ${(props) => props.index};
    }

    &:hover {
      ${Cell.Body} {
        background-color: #fff;

        &:first-child {
          &::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 0;
            transform: translateY(-50%);
            width: 2px;
            height: 16px;
            background: ${color.success};
            border-radius: 0 5px 5px 0;
          }
        }
      }

      ${LinkElement} {
        color: #4960ff;
        font-weight: bold;
      }
    }
  `,
};
