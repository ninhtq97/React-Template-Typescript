import { css } from 'styled-components';

const mixin = {
  flex: css`
    display: flex;
  `,
  alignItemsCenter: css`
    align-items: center;
  `,
  justifyContentCenter: css`
    justify-content: center;
  `,
  clickable: css`
    cursor: pointer;
    user-select: none;
  `,
};

export default mixin;
