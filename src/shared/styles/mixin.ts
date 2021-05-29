import Color from 'color';
import { css } from 'styled-components';
import color from './color';
import { font } from './font';

export const zIndexValues = {
  modal: 1000,
  dropdown: 101,
  navLeft: 100,
};

const customScrollbar = ({ background = color.backgroundMedium } = {}) => css`
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

  scrollableY: css`
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  `,

  veritcalScrollbar: ({ width = 8 } = {}) => css`
    &::-webkit-scrollbar {
      width: ${width}px;
    }

    ${customScrollbar()}
  `,

  horizontalScrollbar: ({ height = 8 } = {}) => css`
    &::-webkit-scrollbar {
      height: ${height}px;
    }
    ${customScrollbar()}
  `,

  backgroundImage: (imageURL: string) => css`
    background-image: url('${imageURL}');
    background-position: 50% 50%;
    background-repeat: no-repeat;
    background-size: cover;
    background-color: ${color.backgroundLight};
  `,

  link: (colorValue = color.textLink) => css`
    cursor: pointer;
    color: ${colorValue};
    ${font.medium}
    &:hover, &:visited, &:active {
      color: ${colorValue};
    }
    &:hover {
      text-decoration: underline;
    }
  `,

  tag: (
    background = color.backgroundMedium,
    colorValue = color.textDarkest
  ) => css`
    display: inline-flex;
    align-items: center;
    height: 24px;
    padding: 0 8px;
    border-radius: 4px;
    cursor: pointer;
    user-select: none;
    color: ${colorValue};
    background: ${background};
    ${font.bold};
    ${font.size(12)};
    svg {
      margin-left: 4px;
    }
  `,

  clickable: css`
    cursor: pointer;
    user-select: none;
  `,

  boxShadowMedium: css`
    box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.1);
  `,

  boxShadowDropdown: css`
    box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px,
      rgba(9, 30, 66, 0.31) 0px 0px 1px;
  `,
};

export default mixin;
