import Color from 'color';
import { css } from 'styled-components';
import color from './color';

const scrollbar = ({ background = color.backgroundMedium } = {}) => css`
  &::-webkit-scrollbar-track {
    background: none;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 99px;
    background: ${background};
  }
`;

const mixin = {
  darken: (colorValue: string, amount: number) =>
    Color(colorValue).darken(amount).string(),
  lighten: (colorValue: string, amount: number) =>
    Color(colorValue).lighten(amount).string(),
  rgba: (colorValue: string, opacity: number) =>
    Color(colorValue).alpha(opacity).string(),

  veritcalScrollbar: ({ width = 8 } = {}) => css`
    &::-webkit-scrollbar {
      width: ${width}px;
      height: ${width}px;
    }

    ${scrollbar()}
  `,
  horizontalScrollbar: ({ height = 8 } = {}) => css`
    &::-webkit-scrollbar {
      height: ${height}px;
      width: ${height}px;
    }
    ${scrollbar()}
  `,

  clickable: css`
    cursor: pointer;
    user-select: none;
  `,
};

export default mixin;
